import {
  AJAX_S_getThemes,
  AJAX_S_getHots,
  AJAX_S_postCount,
  AJAX_S_userSignIn,
  AJAX_S_userSignUp,
  AJAX_S_userSignOut,
  AJAX_S_getFavorites,
  AJAX_S_changeFavorite,
  AJAX_S_postComment
} from "@/modules/server-api";

import { deepCopy } from "@/modules/data-support";

export default {
  namespaced: true,
  state: {
    userActionMsg: "",
    userIsLogin: false
  },
  getters: {
    userActionMsg: state => state.userActionMsg,
    userIsLogin: state => state.userIsLogin,
  },
  mutations: {
    UPDATE_USER_ACTION_MSG: (state, userActionMsg) => state.userActionMsg = userActionMsg,
    UPDATE_USER_LOGIN: (state, userIsLogin) => state.userIsLogin = userIsLogin
  },
  actions: {
    // 從後端要 Theme 資料
    getThemesByServer({ commit }) {
      AJAX_S_getThemes()
      .then(res => {
        const newThemes = res.data.reduce(
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
        // 錯誤處理
      });
    },

    // 從後端要 hots id array
    getHotsByServer({ commit }) {
      AJAX_S_getHots()
      .then(res => {
        commit("UPDATE_HOTS", res.data, { root: true });
      })
      .catch(error => {
        console.log(`getHotsByServer: ${error}`);
        // 錯誤處理
      });
    },

    // 搜尋查到的資料，給後端計數器累積
    postSearchCountToSever(_, ids) {
      const idsStr = JSON.stringify(ids);
      AJAX_S_postCount(idsStr, "addSearch")
      .catch(error => {
        console.log(`postSearchCountToSever: ${error}`);
        // 錯誤處理
      });
    },

    // 進入細節頁面，給後端計數器累積
    postEnterCountToSever(_, id) {
      const idsStr = JSON.stringify([id]);
      AJAX_S_postCount(idsStr, 'addEnter')
      .catch(error => {
        console.log(`postEnterCountToSever: ${error}`);
        // 錯誤處理
      });
    },

    // 按讚或收回讚，給後端計數器累積
    postFavoriteCountToSever(_, { dataId, add }) {
      const idsStr = JSON.stringify([dataId]);
      const addStr = add ? "add" : "remove";
      AJAX_S_postCount(idsStr, `${addStr}Favorite`)
      .catch(error => {
        console.log(`postFavoriteCountToSever: ${error}`);
        // 錯誤處理
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
        const { comments, average_score } = res.data;
        let data = deepCopy(rootState.dataDetail);

        data.Comment = comments;
        data.CommentScore = average_score;
        
        commit("UPDATE_DATA_DETAIL", data, { root: true });
      })
      .catch(error => {
        console.log(`postCommentToServer: ${error}`);
        // 錯誤處理
      });
    },

    // 使用者   ---------
    // 會員登入
    loginUserOnServer({ commit }, { userParams, vm }) {
      AJAX_S_userSignIn(userParams)
      .then(res => {
        const { message, auth_token, favorites } = res.data;
        // 回傳登入訊息 - 開發用
        commit("UPDATE_USER_ACTION_MSG", message);

        // cookie 寫入登入狀態
        vm.$cookies.set('_u', auth_token, null, null, null, true);

        // 更新為已登入
        commit("UPDATE_USER_LOGIN", true);

        // 更新我的旅程為 db 內的
        commit("SET_FAVORITES", favorites, { root: true });
      })
      .catch(error => {
        commit("UPDATE_USER_ACTION_MSG", error);
        console.log(`loginUserOnServer: ${error}`);
        // 錯誤處理
      });
    },

    // 加入會員
    signUpUserOnServer({ commit, rootState }, { userParams, vm }) {
      const favorites = JSON.stringify(rootState.favorites);
      AJAX_S_userSignUp(userParams)
      .then(res => {
        const { message, auth_token } = res.data;
        // 回傳登入訊息 - 開發用
        commit("UPDATE_USER_ACTION_MSG", message);

        // cookie 寫入登入狀態
        vm.$cookies.set('_u', auth_token, null, null, null, true);

        // 更新為已登入
        commit("UPDATE_USER_LOGIN", true);
        return auth_token;
      })
      .then(userAuthToken => {
        // 將 localstorge 我的最愛加入會員資料
        const favoritesParams = { auth_token: userAuthToken, favorites };
        AJAX_S_changeFavorite(favoritesParams)
        .catch(error => {
          commit("UPDATE_USER_ACTION_MSG", error);
          console.log(`signUpUserOnServer: ${error}`);
          // 錯誤處理
        });
      })
      .catch(error => {
        commit("UPDATE_USER_ACTION_MSG", error);
        console.log(`signUpUserOnServer: ${error}`);
        // 錯誤處理
      });
    },

    // 會員登出
    signOutUserOnServer({ commit }, vm) {
      const userAuthToken =  vm.$cookies.get('_u');
      AJAX_S_userSignOut({ auth_token: userAuthToken })
      .then(() => {
        vm.$cookies.remove('_u');
        commit("UPDATE_USER_LOGIN", false);
      })
      .catch(error => {
        commit("UPDATE_USER_ACTION_MSG", error);
        console.log(`signOutUserOnServer: ${error}`);
        // 錯誤處理
      });
    },

    // 取得使用者的我的最愛
    getFavoritesByUser({ commit }, vm) {
      const userAuthToken =  vm.$cookies.get('_u');
      AJAX_S_getFavorites({ auth_token: userAuthToken })
      .then(res => {
        commit("SET_FAVORITES", res.data.favorites, { root: true });
      })
      .catch(error => {
        commit("UPDATE_USER_ACTION_MSG", error);
        console.log(`getFavoritesByUser: ${error}`);
        // 錯誤處理
      });
    },

    // 更新我的最愛
    changeFavoriteToData({ commit, rootState }, { dataId, add, vm }) {
      const favorites = JSON.stringify(rootState.favorites);
      const userAuthToken =  vm.$cookies.get('_u');
      const favoritesParams = { auth_token: userAuthToken, favorites };
      commit("UPDATE_FAVORITE_ADDING", true, { root: true });

      if (add) {
        commit("ADD_FAVORITES", dataId, { root: true });
      } else {
        commit("REMOVE_FAVORITES", dataId, { root: true });
      }
      // 向後端丟個資料
      this.dispatch("serverModule/postFavoriteCountToSever", { dataId, add });

      AJAX_S_changeFavorite(favoritesParams)
      .catch(error => {
        console.log(`changeFavoriteToData: ${error}`);
        // 錯誤處理
      });

      commit("UPDATE_FAVORITE_ADDING", false, { root: true });
    },
  }
}