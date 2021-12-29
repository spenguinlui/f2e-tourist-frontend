import { getThemes_AJAX_S } from "@/modules/api";

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
      getThemes_AJAX_S().then((res) => {
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
    }
  }
}