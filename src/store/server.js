import {
  AJAX_S_getThemes,
  AJAX_S_getHots,
  AJAX_S_postCount,
  AJAX_S_userSignIn,
  AJAX_S_userSignUp,
  AJAX_S_userSignOut,
  AJAX_S_userCheck,
  AJAX_S_getFavorites,
  AJAX_S_changeFavorite,
  AJAX_S_postComment,
  AJAX_S_supplierSignIn,
  AJAX_S_supplierSignOut,
  AJAX_S_adminSignIn,
  AJAX_S_adminSignOut,
  AJAX_S_patchTheme,
  AJAX_S_addTheme,
  AJAX_S_deleteTheme,
  AJAX_S_getUsers,
  AJAX_S_getSetting,
  AJAX_S_patchSetting,
  AJAX_S_getSupppliers
} from "@/modules/server-api";

import { deepCopy } from "@/modules/data-support";

export default {
  namespaced: true,
  state: {
    userIsLogin: false,
    users: [],
    settings: [],
    suppliers: []
  },
  getters: {
    userIsLogin: state => state.userIsLogin,
    users: state => state.users,
    settings: state => state.settings,
    suppliers: state => state.suppliers
  },
  mutations: {
    UPDATE_USER_LOGIN: (state, userIsLogin) => state.userIsLogin = userIsLogin,
    UPDATE_USERS: (state, users) => state.users = users,
    UPDATE_SETTINGS: (state, settings) => state.settings = settings,
    UPDATE_SUPPLIERS: (state, suppliers) => state.suppliers = suppliers
  },
  actions: {
    // 從後端要 Theme 資料
    getThemesByServer({ commit }) {
      AJAX_S_getThemes()
      .then(res => {
        const newThemes = res.data.themes.reduce(
          (newObj, theme) => {
            newObj[theme.id] = {
              themeId: theme.id,
              themeName: theme.theme_name,
              themeTags: theme.theme_tags,
              themeDataList: []
            }
            return newObj;
          }, {}
        );
        commit("UPDATE_THEMES", newThemes, { root: true });
      })
      .catch(error => {
        console.log(`getThemesByServer: ${error}`);
      });
    },

    // 從後端要 hots id array
    getHotsByServer({ commit }) {
      AJAX_S_getHots()
      .then(res => {
        commit("UPDATE_HOTS", res.data.ids, { root: true });
      })
      .catch(error => {
        console.log(`getHotsByServer: ${error}`);
      });
    },

    // 搜尋查到的資料，給後端計數器累積
    postSearchCountToSever(_, ids) {
      const idsStr = JSON.stringify(ids);
      AJAX_S_postCount(idsStr, "addSearch")
      .catch(error => {
        console.log(`postSearchCountToSever: ${error}`);
      });
    },

    // 進入細節頁面，給後端計數器累積
    postEnterCountToSever(_, id) {
      const idsStr = JSON.stringify([id]);
      AJAX_S_postCount(idsStr, 'addEnter')
      .catch(error => {
        console.log(`postEnterCountToSever: ${error}`);
      });
    },

    // 按讚或收回讚，給後端計數器累積
    postFavoriteCountToSever(_, { dataId, add }) {
      const idsStr = JSON.stringify([dataId]);
      const addStr = add ? "add" : "remove";
      AJAX_S_postCount(idsStr, `${addStr}Favorite`)
      .catch(error => {
        console.log(`postFavoriteCountToSever: ${error}`);
      });
    },

    // 送出評論
    postCommentToServer({ commit, rootState }, { commentForm, id, vm }) {
      const userAuthToken = vm.$cookies.get('_u');
      const dataForm = {
        auth_token: userAuthToken,
        ...commentForm
      }
      AJAX_S_postComment(dataForm, id)
      .then(res => {
        const { message, comments, average_score } = res.data;
        let data = deepCopy(rootState.dataDetail);

        data.Comment = comments;
        data.CommentScore = average_score;
        
        commit("UPDATE_DATA_DETAIL", data, { root: true });
        window.alert(message);
      })
      .catch(error => {
        console.log(`postCommentToServer: ${error}`);
        window.alert("新增評論失敗");
      });
    },

    // 使用者   ---------
    // 會員登入
    loginUserOnServer({ commit }, { userParams, vm }) {
      AJAX_S_userSignIn(userParams)
      .then(res => {
        const { message, auth_token, favorites } = res.data;

        // cookie 寫入登入狀態
        vm.$cookies.set('_u', auth_token, '1d', null, null, true);

        // 更新為已登入
        commit("UPDATE_USER_LOGIN", true);

        // 更新我的旅程為 db 內的
        commit("SET_FAVORITES", favorites, { root: true });

        window.alert(message);
        vm.$router.push({ name: "favorites" });
      })
      .catch(error => {
        console.log(`loginUserOnServer: ${error}`);
        window.alert("登入失敗");
      });
    },

    // 加入會員
    signUpUserOnServer({ commit, rootState }, { userParams, vm }) {
      const favorites = JSON.stringify(rootState.favorites);
      AJAX_S_userSignUp(userParams)
      .then(res => {
        if (res.data.status === 200) {
          const { auth_token } = res.data;
  
          // cookie 寫入登入狀態
          vm.$cookies.set('_u', auth_token, '1d', null, null, true);
  
          // 更新為已登入
          commit("UPDATE_USER_LOGIN", true);

          // 將 localstorge 我的最愛加入會員資料
          const favoritesParams = { auth_token, favorites };
    
          AJAX_S_changeFavorite(favoritesParams)
          .then(res => {
            if (res.data.status === 200) {
              window.alert("申請成功");
              vm.$router.push({ name: "favorites" });
            } else {
              window.alert(res.data.message);
            }
          })
        } else {
          window.alert(res.data.message);
        }
      })
      .catch(error => {
        console.log(`signUpUserOnServer: ${error}`);
        vm.$router.push('/');
        window.alert("發生不明錯誤");
      })
    },

    // 會員登出
    signOutUserOnServer({ commit }, vm) {
      const userAuthToken =  vm.$cookies.get('_u');
      AJAX_S_userSignOut({ auth_token: userAuthToken })
      .then(() => {
        commit("UPDATE_USER_LOGIN", false);
        vm.delete_cookie('_u', '/', vm.domain);
        vm.$router.push({ name: "home" });
      })
      .catch(error => {
        commit("UPDATE_USER_LOGIN", false);
        vm.delete_cookie('_u', '/', vm.domain);
        vm.$router.push({ name: "home" });
        console.log(`signOutUserOnServer: ${error}`);
      });
    },

    // 檢查會員是否能有效
    checkUserStatus({ commit }, vm){
      const userAuthToken =  vm.$cookies.get('_u');
      AJAX_S_userCheck({ auth_token: userAuthToken })
      .then(res => {
        const { auth_token, favorites } = res.data;
        vm.$cookies.remove('_u');
        vm.$cookies.set('_u', auth_token, '1d', null, null, true);
        commit("SET_FAVORITES", favorites, { root: true });
        commit("UPDATE_USER_LOGIN", true);
      })
      .catch(error => {
        vm.delete_cookie('_u', '/', vm.domain);
        console.log(`checkUserStatus: ${error}`);
      })
    },

    // 取得使用者的我的最愛
    getFavoritesByUser({ commit }, vm) {
      const userAuthToken =  vm.$cookies.get('_u');
      AJAX_S_getFavorites({ auth_token: userAuthToken })
      .then(res => {
        if (res.data.favorites) {
          commit("SET_FAVORITES", res.data.favorites, { root: true });
        }
      })
      .catch(error => {
        console.log(`getFavoritesByUser: ${error}`);
      });
    },

    // 更新我的最愛
    async changeFavoriteToData({ commit, rootState }, { dataId, add, vm }) {
      const userAuthToken =  vm.$cookies.get('_u');
      commit("UPDATE_FAVORITE_ADDING", true, { root: true });
      
      // 先更改 vuex 中的 favorites
      await commit(add ? 'ADD_FAVORITES' : 'REMOVE_FAVORITES', dataId, { root: true });
      
      // 更新 server user 的 favorites
      const favorites = JSON.stringify(rootState.favorites);
      const favoritesParams = { auth_token: userAuthToken, favorites };
      AJAX_S_changeFavorite(favoritesParams)
      .catch(error => {
        console.log(`changeFavoriteToData: ${error}`);
      });

      commit("UPDATE_FAVORITE_ADDING", false, { root: true });
      // 向後端丟個計數器
      this.dispatch("serverModule/postFavoriteCountToSever", { dataId, add });
    },

    // 廠商 ----
    // 廠商登入
    loginSupplierOnServer(_, { supplierParams, vm }) {
      AJAX_S_supplierSignIn(supplierParams)
      .then(res => {
        const { auth_token } = res.data;

        // cookie 寫入登入狀態
        vm.$cookies.set('_s', auth_token, '1d', null, null, true);

        window.alert("登入成功");
        vm.$router.push({ name: 'suppliers' });
      })
      .catch(error => {
        console.log(`loginSupplierOnServer: ${error}`);
        window.alert("廠商登入失敗");
      });
    },

    // 廠商登出
    signOutSupplierOnServer(_, vm) {
      const supplierAuthToken =  vm.$cookies.get('_s');
      AJAX_S_supplierSignOut({ auth_token: supplierAuthToken })
      .then(() => {
        vm.delete_cookie('_s', '/', vm.domain);
        vm.$router.push({ name: "home" });
      })
      .catch(error => {
        vm.delete_cookie('_s', '/', vm.domain);
        vm.$router.push({ name: "home" });
        console.log(`signOutSupplierOnServer: ${error}`);
      });
    },

    // 管理者 ----
    // 管理者登入
    loginAdminOnServer(_, { adminParams, vm }) {
      AJAX_S_adminSignIn(adminParams)
      .then(res => {
        const { auth_token } = res.data;

        // cookie 寫入登入狀態
        vm.$cookies.set('_a', auth_token, '1d', null, null, true);

        window.alert("登入成功");
        vm.$router.push({ name: 'admin' });
      })
      .catch(error => {
        console.log(`loginAdminOnServer: ${error}`);
        // 錯誤處理
        window.alert("管理員登入失敗");
      });
    },

    // 管理者登出
    signOutAdminOnServer(_, vm) {
      const adminAuthToken =  vm.$cookies.get('_a');
      AJAX_S_adminSignOut({ auth_token: adminAuthToken })
      .then(() => {
        vm.delete_cookie('_a', '/', vm.domain);
        vm.$router.push({ name: "home" });
      })
      .catch(error => {
        vm.delete_cookie('_a', '/', vm.domain);
        vm.$router.push({ name: "home" });
        console.log(`signOutUserOnServer: ${error}`);
      });
    },

    // 主題修改
    updateThemeToServer({ commit }, { themeId, themeParams, vm }) {
      const adminAuthToken = vm.$cookies.get('_a');
      themeParams.auth_token = adminAuthToken;
      AJAX_S_patchTheme(themeId, themeParams)
      .then(res => {
        const newThemes = res.data.themes.reduce(
          (newObj, theme) => {
            newObj[theme.id] = {
              themeId: theme.id,
              themeName: theme.theme_name,
              themeTags: theme.theme_tags,
              themeDataList: []
            }
            return newObj;
          }, {}
        );
        commit("UPDATE_THEMES", newThemes, { root: true });
        window.alert("主題修改成功");
      })
      .catch(error => {
        console.log(`updateThemeToServer: ${error}`);
        // 錯誤處理
        window.alert("主題修改失敗");
      });
    },

    // 主題新增
    addThemeToServer({ commit }, { themeParams, vm }) {
      const adminAuthToken = vm.$cookies.get('_a');
      themeParams.auth_token = adminAuthToken;
      AJAX_S_addTheme(themeParams)
      .then(res => {
        const newThemes = res.data.themes.reduce(
          (newObj, theme) => {
            newObj[theme.id] = {
              themeId: theme.id,
              themeName: theme.theme_name,
              themeTags: theme.theme_tags,
              themeDataList: []
            }
            return newObj;
          }, {}
        );
        commit("UPDATE_THEMES", newThemes, { root: true });
        window.alert("主題新增成功");
      })
      .catch(error => {
        console.log(`addThemeToServer: ${error}`);
        // 錯誤處理
        window.alert("主題新增失敗");
      });
    },

    // 主題刪除
    deleteThemeToServer({ commit }, { themeId, vm }) {
      const adminAuthToken = vm.$cookies.get('_a');
      const themeParams = {
        auth_token: adminAuthToken,
        id: themeId
      }
      AJAX_S_deleteTheme(themeParams)
      .then(res => {
        const newThemes = res.data.themes.reduce(
          (newObj, theme) => {
            newObj[theme.id] = {
              themeId: theme.id,
              themeName: theme.theme_name,
              themeTags: theme.theme_tags,
              themeDataList: []
            }
            return newObj;
          }, {}
        );
        commit("UPDATE_THEMES", newThemes, { root: true });
        window.alert("主題刪除成功");
      })
      .catch(error => {
        console.log(`deleteThemeToServer: ${error}`);
        window.alert("主題刪除失敗");
      });
    },

    // 取得使用者
    getUsersByServer({ commit }, { vm }) {
      const adminAuthToken = vm.$cookies.get('_a');
      AJAX_S_getUsers({ auth_token: adminAuthToken })
      .then(res => {
        commit("UPDATE_USERS", res.data.users);
      })
      .catch(error => {
        console.log(`getUsersByServer: ${error}`);
        // 錯誤處理
      });
    },

    // 取得參數設定列表
    getSettingByServer({ commit }, { vm }) {
      const adminAuthToken = vm.$cookies.get('_a');
      AJAX_S_getSetting({ auth_token: adminAuthToken })
      .then(res => {
        if (res.data.status === 200) {
          commit("UPDATE_SETTINGS", res.data.settings);
        } else {
          window.alert(res.data.message);
        }
      })
      .catch(error => {
        console.log(`getSettingByServer: ${error}`);
        window.alert("發生不明錯誤");
      });
    },

    // 修改參數設定
    updateSettingToServer({ commit }, { settingParams, vm }) {
      const adminAuthToken = vm.$cookies.get('_a');
      settingParams.auth_token = adminAuthToken;
      AJAX_S_patchSetting(settingParams)
      .then(res => {
        if (res.data.status === 200) commit("UPDATE_SETTINGS", res.data);
        window.alert(res.data.message);
      })
      .catch(error => {
        console.log(`updateSettingToServer: ${error}`);
        window.alert("發生不明錯誤");
      });
    },

    // 取得廠商資料
    getSupplier({ commit }, { vm }) {
      const supplierAuthToken = vm.$cookies.get('_a');
      const supplierParams = { auth_token: supplierAuthToken };
      AJAX_S_getSupppliers(supplierParams)
      .then(res => {
        commit("UPDATE_SUPPLIERS", res.data.suppliers);
      })
      .catch(error => {
        console.log(`getSupplier: ${error}`);
        window.alert("發生不明錯誤");
      });
    }
  }
}