import L from 'leaflet';

import {
  AJAX_getScenicSpot,
  AJAX_getRestaurant,
  AJAX_getHotel,
  AJAX_getActivity,
  AJAX_getDetail
} from "./modules/api";

import { determineIcon, createMarkerPopupObj } from "./modules/map-support";
import { determineType, concatAndAddType } from "./modules/data-support";

export const storeObject = {
  state: {
    dataList: [],          // 單一類型資料集合
    allTypeDataList: [],   // 所有類型資料集合
    dataDetail: {},        // 指定資料詳細內容
    
    keyword: "",           // 搜尋關鍵字
    currentCity: "臺北市",  // 地區過濾第一層 - 城市
    currentTown: "中山區",  // 地區過濾第二層 - 鄉鎮
    currentClassType: "",  // Class 類型過濾
    
    mapMode: false,        // 是否切換地圖瀏覽模式
    heartIsLoading: false, // 加入我的最愛是否程序中
    mapClass: {},          // 全域地圖物件

    // -- DB 交流
    favorites: [],         // 我的最愛 ID 集合
    favoriteDataList: [],  // 我的最愛資料集合
    hots: [],              // 熱門資料 ID 集合
    hotDataList: [],       // 熱門資料集合
    themes: [              // 主題物件集合(包含集合)，init [] << DB
      {                    // 主題物件 - 主題名稱、Tag 陣列
        themeName: "Rainbow Life!",
        themeTags: ["彩虹", "七彩"]
      }
    ],
    themeDataList: []
  },
  getters: {
    dataList: state => state.dataList,
    allTypeDataList: state => state.allTypeDataList,
    dataDetail: state => state.dataDetail,
    hotDataList: state => state.hotDataList,
    favoriteDataList: state => state.favoriteDataList,
    themeDataList: state => state.themeDataList,
    favorites: state => state.favorites,
    themes: state => state.themes,
    keyword: state => state.keyword,
    currentCity: state => state.currentCity,
    currentTown: state => state.currentTown,
    currentClassType: state => state.currentClassType,
    mapMode: state => state.mapMode,
    heartIsLoading: state => state.heartIsLoading,
  },
  mutations: {
    UPDATE_DATA_LIST: (state, dataList) => state.dataList = dataList,
    UPDATE_ALL_TYPE_DATA_LIST: (state, dataList) => state.allTypeDataList = dataList,
    UPDATE_HOT_DATA_LIST: (state, dataList) => state.hotDataList = dataList,
    UPDATE_FAVORITE_DATA_LIST: (state, dataList) => state.favoriteDataList = dataList,
    UPDATE_THEME_DATA_LIST: (state, dataList) => state.themeDataList = dataList,
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
    TOGGLE_CLASS_TYPE: (state, classType) => state.currentClassType = classType,
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
        return res.data[0];
      }).then(data => {
        const position = {
          latitude: data.Position.PositionLat,
          longitude: data.Position.PositionLon
        }
        Promise.all([
          AJAX_getScenicSpot({ position }),
          AJAX_getRestaurant({ position }),
          AJAX_getHotel({ position }),
          AJAX_getActivity({ position })
        ]).then(ress => {
          const nearbyDataList = concatAndAddType(ress);
          data.NearbyDataList = nearbyDataList;
          commit("UPDATE_DATA_DETAIL", data);
        }).catch((error) => {
          console.log(error);
          // 錯誤處理
        })
      })
      .catch((error) => {
        console.log(error);
        // 錯誤處理
      })
    },

    // 搜尋附近地點所有類型資料
    getAllTypeDataListWithPosition({ commit }, Position) {
      const position = {
        latitude: Position.PositionLon,
        longitude: Position.PositionLat
      }

      Promise.all([
        AJAX_getScenicSpot({ position }),
        AJAX_getRestaurant({ position }),
        AJAX_getHotel({ position }),
        AJAX_getActivity({ position })
      ]).then(ress => {
        const datalist = concatAndAddType(ress);
        commit("UPDATE_ALL_TYPE_DATA_LIST", datalist);
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
        const datalist = concatAndAddType(ress);
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

    // 以 Class 類型篩選資料集合
    filterDataListByClass({ commit }, { dataType, classType }) {
      const ajaxList = [AJAX_getScenicSpot, AJAX_getRestaurant, AJAX_getHotel, AJAX_getActivity];
      let targetAjax;
      switch (dataType) {
        case "scenicspots": targetAjax = ajaxList[0]; break;
        case "restaurants": targetAjax = ajaxList[1]; break;
        case "hotels": targetAjax = ajaxList[2];      break;
        case "activities": targetAjax = ajaxList[3];  break;
        default: targetAjax = ajaxList[0];            break;
      }
      const classObject = { dataType, classType };
      targetAjax({ classObject }).then(res => {
        commit("TOGGLE_CLASS_TYPE", classType);
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
      
      add ? commit("ADD_FAVORITES", dataId) : commit("REMOVE_FAVORITES", dataId);
      localStorage.setItem("touristHeart", JSON.stringify(this.state.favorites));

      commit("UPDATE_HEART_LOADING", false);
    },

    // 在地圖上打入景點 marker
    setMarkerOnMap() {
      if (this.state.dataList.length === 0) return;
      const mapClass = this.state.mapClass;
      const markerLayer = new L.LayerGroup().addTo(mapClass);

      this.state.dataList.forEach((data) => {
        const { PositionLat, PositionLon } = data.Position;
        L.marker([PositionLat, PositionLon], { icon: determineIcon(data.ID) })
          .bindPopup(
            createMarkerPopupObj(data),
            {
              minWidth: 300,
              offset: [0, -30],
              className: `map-card ${determineType(data.ID)}`
            }
          )
          .addTo(markerLayer);
      })
      if (mapClass.tap) mapClass.tap.disable();
      const firstPositionLat = this.state.dataList[0].Position.PositionLat;
      const firstPositionLon = this.state.dataList[0].Position.PositionLon;
      mapClass.flyTo([firstPositionLat, firstPositionLon], 16, {
        animate: true,
        duration: 1.5
      });
    },

    // 取得熱門景點資料集合
    getHotDataList({ commit }) {
      // const hotArray = getHotIds()  --- 從 db吐，然後存到 this.state.hots;

      // mock
      const hotArray = ["C1_315081100H_000021", "C3_382000000A_206463", "C2_315080000H_080485", "C4_315080000H_013058", "C1_376490000A_100032"]

      Promise.all([
        AJAX_getScenicSpot({ ids: hotArray }),
        AJAX_getRestaurant({ ids: hotArray }),
        AJAX_getHotel({ ids: hotArray }),
        AJAX_getActivity({ ids: hotArray })
      ]).then(ress => {
        const datalist = concatAndAddType(ress);
        commit("UPDATE_HOT_DATA_LIST", datalist);
      }).catch((error) => {
        console.log(error);
        // 錯誤處理
      })
    },

    // 取得熱門景點資料集合
    getFavoriteDataList({ commit }) {
      const favoriteIds = this.state.favorites

      Promise.all([
        AJAX_getScenicSpot({ ids: favoriteIds }),
        AJAX_getRestaurant({ ids: favoriteIds }),
        AJAX_getHotel({ ids: favoriteIds }),
        AJAX_getActivity({ ids: favoriteIds })
      ]).then(ress => {
        const datalist = concatAndAddType(ress);
        commit("UPDATE_FAVORITE_DATA_LIST", datalist);
      }).catch((error) => {
        console.log(error);
        // 錯誤處理
      })
    },

    // 取得單一主題景點資料集合
    getThemeDataList({ commit }, themeTags) {
      Promise.all([
        AJAX_getScenicSpot({ tags: themeTags }),
        AJAX_getRestaurant({ tags: themeTags }),
        AJAX_getHotel({ tags: themeTags }),
        AJAX_getActivity({ tags: themeTags })
      ]).then(ress => {
        const datalist = concatAndAddType(ress);
        commit("UPDATE_THEME_DATA_LIST", datalist);
      }).catch((error) => {
        console.log(error);
        // 錯誤處理
      })
    }
  }
}