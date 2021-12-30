import axios from 'axios';
import { getServerPrefixUrl } from "@/modules/api";

export default {
  namespaced: true,
  state: {

  },
  getters: {

  },
  mutations: {

  },
  actions: {
    // 從後端要 Theme 資料
    getThemesByServer({ commit }) {
      axios({
        method: 'get',
        url: `${getServerPrefixUrl}/themes`,
      }).then((res) => {
        if (res.status === 200) {
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
        }
      }).catch((error) => {
        console.log(error);
        // 錯誤處理
      })
    },

    // 搜尋查到的資料，給後端計數器累積
    postSearchCountToSever(_, ids) {
      const idsStr = JSON.stringify(ids);
      axios({
        method: 'post',
        url: `${getServerPrefixUrl}/count/addSearch`,
        header: { "Content-Type": "application/json" },
        data: idsStr,
      }).catch((error) => {
        console.log(error);
        // 錯誤處理
      })
    },

    // 進入細節頁面，給後端計數器累積
    postEnterCountToSever(_, id) {
      const idsStr = JSON.stringify([id]);
      axios({
        method: 'post',
        url: `${getServerPrefixUrl}/count/addEnter`,
        header: { "Content-Type": "application/json" },
        data: idsStr,
      }).catch((error) => {
        console.log(error);
        // 錯誤處理
      })
    },

    // 按讚或收回讚，給後端計數器累積
    postFavoriteCountToSever(_, id, add) {
      const idsStr = JSON.stringify([id]);
      const addStr = add ? "add" : "remove";
      axios({
        method: 'post',
        url: `${getServerPrefixUrl}/count/${addStr}Favorite`,
        header: { "Content-Type": "application/json" },
        data: idsStr,
      }).catch((error) => {
        console.log(error);
        // 錯誤處理
      })
    }
  }
}