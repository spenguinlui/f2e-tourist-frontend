import L from 'leaflet';
import scenicspotIcon from "./assets/images/icon/spot-marker.svg";
import foodIcon from "./assets/images/icon/food-marker.svg";
import hotelIcon from "./assets/images/icon/hotel-marker.svg";
import noImage from "./assets/images/empty-img.png"
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

const determineIcon = (id) => {
  const type = determineType(id);
  const icon = (type) => {
    switch (type) {
      case "scenicspots": return scenicspotIcon;
      case "activities": return scenicspotIcon;
      case "restaurants": return foodIcon;
      case "hotels": return hotelIcon;
      default: return null;
    }
  }
  return L.icon({
    iconUrl: icon(type),
    iconSize: [32, 40],
    iconAnchor: [16, 40],
  });
}

const createMarkerPopupObj = (data) => {
  return `
  <div class="card-img" style="padding-top: .5rem;">
    <img
      style="width: 100%;"
      src="${(data.Picture && data.Picture.PictureUrl1) ? data.Picture.PictureUrl1 : noImage}"
      alt="${(data.Picture && data.Picture.PictureDescription1) ? data.Picture.PictureDescription1 : 'no-image'}">
    <h5 class="card-content-title">${data.Name}</h5>
  </div>
  `
};

export const storeObject = {
  state: {
    dataList: [],
    allTypeDataList: [],
    dataDetail: {},
    favorites: [],
    keyword: "",
    currentCity: "臺北市",
    currentTown: "中山區",
    mapMode: false,
    heartIsLoading: false, // 加入我的最愛是否程序中
    mapClass: {},
  },
  getters: {
    dataList: state => state.dataList,
    allTypeDataList: state => state.allTypeDataList,
    dataDetail: state => state.dataDetail,
    favorites: state => state.favorites,
    keyword: state => state.keyword,
    currentCity: state => state.currentCity,
    currentTown: state => state.currentTown,
    mapMode: state => state.mapMode,
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
    TOGGLE_CITY: (state, cityName) => state.currentCity = cityName,
    TOGGLE_TOWN: (state, townName) => state.currentTown = townName,
    TOGGLE_MAP_MODE: (state, mapMode) => state.mapMode = mapMode,

    UPDATE_HEART_LOADING: (state, isProgress) => state.heartIsLoading = isProgress,
    SET_FAVORITES: (state, favorites) => state.favorites = favorites,
    ADD_FAVORITES: (state, dataId) => state.favorites.push(dataId),
    REMOVE_FAVORITES: (state, dataId) => state.favorites.splice(state.favorites.indexOf(dataId), 1),

    SET_MAP_MODE_OBJECT: (state, mapClass) => state.mapClass = mapClass,
  },
  actions: {
    // 取得單一類型資料集合
    getSingleTypeDataList({ commit }, dataType) {
      const ajaxList = [AJAX_getScenicSpot, AJAX_getRestaurant, AJAX_getHotel, AJAX_getActivity];
      let targetAjax;
      switch (dataType) {
        case "scenicspots": targetAjax = ajaxList[0]; break;
        case "restaurants": targetAjax = ajaxList[1]; break;
        case "hotels": targetAjax = ajaxList[2];      break;
        case "activities": targetAjax = ajaxList[3];  break;
        default: targetAjax = ajaxList[0];            break;
      }
      targetAjax({}).then(res => {
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
        AJAX_getScenicSpot({ keyword }),
        AJAX_getRestaurant({ keyword }),
        AJAX_getHotel({ keyword }),
        AJAX_getActivity({ keyword })
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

    // 以鄉鎮市區過濾資料集合
    filterDataListWithTown({ commit }, { dataType, townName }) {
      const ajaxList = [AJAX_getScenicSpot, AJAX_getRestaurant, AJAX_getHotel, AJAX_getActivity];
      let targetAjax;
      switch (dataType) {
        case "scenicspots": targetAjax = ajaxList[0]; break;
        case "restaurants": targetAjax = ajaxList[1]; break;
        case "hotels": targetAjax = ajaxList[2];      break;
        case "activities": targetAjax = ajaxList[3];  break;
        default: targetAjax = ajaxList[0];            break;
      }
      targetAjax({ townName }).then(res => {
        commit("TOGGLE_TOWN", townName);
        commit("UPDATE_DATA_LIST", res.data);
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

    // 在地圖上打入景點 marker
    setMarkerOnMap() {
      const markerLayer = new L.LayerGroup().addTo(this.state.mapClass);

      this.state.dataList.forEach((data) => {
        const { PositionLat, PositionLon } = data.Position;
        L.marker([PositionLat, PositionLon], { icon: determineIcon(data.ID) })
          .bindPopup(
            createMarkerPopupObj(data),
            {
              minWidth: 100,
              offset: [0, -30],
              className: `card ${determineType(data.ID)}`
            }
          )
          .addTo(markerLayer);
      })
      const firstPositionLat = this.state.dataList[0].Position.PositionLat;
      const firstPositionLon = this.state.dataList[0].Position.PositionLon;
      this.state.mapClass.flyTo([firstPositionLat, firstPositionLon]);
    }
  }
}