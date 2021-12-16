import {
  AJAX_getScenicSpot,
  AJAX_getRestaurant,
  AJAX_getHotel,
  AJAX_getActivity
} from "./modules/api"

export const storeObject = {
  state: {
    dataList: [],
    favorites: [],
    heartIsLoading: false, // 加入我的最愛是否程序中
  },
  getters: {
    dataList: state => state.dataList,
    favorites: state => state.favorites,
    heartIsLoading: state => state.heartIsLoading,
  },
  mutations: {
    UPDATE_DATA_LIST: (state, dataList) => state.dataList = dataList,
    UPDATE_HEART_LOADING: (state, isProgress) => state.heartIsLoading = isProgress,
    SET_FAVORITES: (state, favorites) => state.favorites = favorites,
    ADD_FAVORITES: (state, dataId) => state.favorites.push(dataId),
    REMOVE_FAVORITES: (state, dataId) => state.favorites.splice(state.favorites.indexOf(dataId), 1),
  },
  actions: {
    getSingleTypeDataList({ commit }, type) {
      const ajaxList = [AJAX_getScenicSpot, AJAX_getRestaurant, AJAX_getHotel, AJAX_getActivity];
      let targetAjax;
      switch (type) {
        case "scenicspots": targetAjax = ajaxList[0]
          break;
        case "restaurants": targetAjax = ajaxList[1]
          break;
        case "hotels": targetAjax = ajaxList[2]
          break;
        case "activities": targetAjax = ajaxList[3]
          break;
        default: targetAjax = ajaxList[0]
          break;
      }
      targetAjax().then((res) => {
        commit("UPDATE_DATA_LIST", res.data);
      }).catch((error) => {
        console.log(error);
        // 錯誤處理
      })
    },

    // 我的最愛
    getFavorites({ commit }) {
      const heartArray = JSON.parse(localStorage.getItem("touristHeart"));
      if (heartArray) {
        commit("SET_FAVORITES", heartArray);
      }
    },
    changeFavoriteToData({ commit }, { dataId, add }) {
      commit("UPDATE_HEART_LOADING", true);
      if (add) {
        commit("ADD_FAVORITES", dataId);
      } else {
        commit("REMOVE_FAVORITES", dataId);
      }
      localStorage.setItem("touristHeart", JSON.stringify(this.state.favorites));
      commit("UPDATE_HEART_LOADING", false);
    },
  }
}