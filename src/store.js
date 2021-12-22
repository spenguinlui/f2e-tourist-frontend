import {
  AJAX_getScenicSpot,
  AJAX_getRestaurant,
  AJAX_getHotel,
  AJAX_getActivity,
  AJAX_getDetail
} from "./modules/api";

const determineType = (id) => {
  const type = id.slice(0, 2);
  switch (type) {
    case "C1": return "scenicspots";
    case "C2": return "activities";
    case "C3": return "restaurants";
    case "C4": return "hotels";
    default: return null;
  }
}

export const storeObject = {
  state: {
    dataList: [],
    allTypeDataList: [],
    dataDetail: {},
    favorites: [],
    keyword: "",
    heartIsLoading: false, // 加入我的最愛是否程序中
  },
  getters: {
    dataList: state => state.dataList,
    allTypeDataList: state => state.allTypeDataList,
    dataDetail: state => state.dataDetail,
    favorites: state => state.favorites,
    keyword: state => state.keyword,
    heartIsLoading: state => state.heartIsLoading,
  },
  mutations: {
    UPDATE_DATA_LIST: (state, dataList) => state.dataList = dataList,
    UPDATE_ALL_TYPE_DATA_LIST: (state, dataList) => state.allTypeDataList = dataList,
    UPDATE_DATA_DETAIL: (state, dataDetail) => {
      dataDetail.showPicture = "";
      if (dataDetail.Picture && dataDetail.Picture.PictureUrl1)
        dataDetail.showPicture = dataDetail.Picture.PictureUrl1;
      state.dataDetail = dataDetail;
    },
    UPDATE_DATA_DETAIL_SHOW_PICTURE: (state, PictureUrl) => state.dataDetail.showPicture = PictureUrl,
    UPDATE_KEYWORD: (state, keyword) => state.keyword = keyword,

    UPDATE_HEART_LOADING: (state, isProgress) => state.heartIsLoading = isProgress,
    SET_FAVORITES: (state, favorites) => state.favorites = favorites,
    ADD_FAVORITES: (state, dataId) => state.favorites.push(dataId),
    REMOVE_FAVORITES: (state, dataId) => state.favorites.splice(state.favorites.indexOf(dataId), 1),
  },
  actions: {
    // 取得單一類型資料集合
    getSingleTypeDataList({ commit }, type) {
      const ajaxList = [AJAX_getScenicSpot, AJAX_getRestaurant, AJAX_getHotel, AJAX_getActivity];
      let targetAjax;
      switch (type) {
        case "scenicspots": targetAjax = ajaxList[0]; break;
        case "restaurants": targetAjax = ajaxList[1]; break;
        case "hotels": targetAjax = ajaxList[2];      break;
        case "activities": targetAjax = ajaxList[3];  break;
        default: targetAjax = ajaxList[0];            break;
      }
      targetAjax().then(res => {
        commit("UPDATE_DATA_LIST", res.data);
      }).catch((error) => {
        console.log(error);
        // 錯誤處理
      })
    },

    // 取得單一類型資料細節
    getSingleTypeDetail({ commit }, id) {
      AJAX_getDetail({ id }).then(res => {
        commit("UPDATE_DATA_DETAIL", res.data[0]);
      }).catch((error) => {
        console.log(error);
        // 錯誤處理
      })
    },

    // 以關鍵字搜尋所有類型資料
    getAllTypeDataListWithKeyword({ commit }, keyword) {
      Promise.all([
        AJAX_getScenicSpot(keyword),
        AJAX_getRestaurant(keyword),
        AJAX_getHotel(keyword),
        AJAX_getActivity(keyword)
      ]).then(ress => {
        const datalist = ress.reduce(
          (collection, res) => {
            res.data.map((data) => data.Type = determineType(data.ID));
            return collection.concat(res.data);
          }, []
        )
        commit("UPDATE_ALL_TYPE_DATA_LIST", datalist);
        commit("UPDATE_KEYWORD", "");
      }).catch((error) => {
        console.log(error);
        // 錯誤處理
      })
    },

    // 更改細節頁面目前顯示大圖
    changeDetailShowPicture({ commit }, PictureUrl) {
      commit("UPDATE_DATA_DETAIL_SHOW_PICTURE", PictureUrl);
    },

    // 從瀏覽器取得我的最愛
    getFavorites({ commit }) {
      const heartArray = JSON.parse(localStorage.getItem("touristHeart"));
      if (heartArray) commit("SET_FAVORITES", heartArray);
    },

    // 將我的最愛更新後存入瀏覽器
    changeFavoriteToData({ commit }, { dataId, add }) {
      commit("UPDATE_HEART_LOADING", true);
      if (add) commit("ADD_FAVORITES", dataId);
      else commit("REMOVE_FAVORITES", dataId);
      localStorage.setItem("touristHeart", JSON.stringify(this.state.favorites));
      commit("UPDATE_HEART_LOADING", false);
    },
  }
}