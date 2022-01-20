import {
  AJAX_getScenicSpot,
  AJAX_getRestaurant,
  AJAX_getHotel,
  AJAX_getActivity,
  AJAX_getDetail,
  AJAX_getOneData,
  getSingleType_AJAX
} from "@/modules/api";

import {
  AJAX_S_getDetail,
  AJAX_S_getScoreByDataList
} from "@/modules/server-api";

import { createCommonIDAndName, determineType, addCommentScore, concatAndAddType } from "@/modules/data-support";

import serverModule from "./server";
import otherModule from "./other";

export const storeObject = {
  state: {
    dataList: [],           // 單一類型資料集合
    allTypeDataList: [],    // 所有類型資料集合
    dataDetail: {},         // 指定資料詳細內容
    
    keyword: "",            // 搜尋關鍵字
    currentCity: "臺北市",   // 地區過濾第一層 - 城市
    currentTown: "",        // 地區過濾第二層 - 鄉鎮
    currentClassType: "",   // Class 類型過濾
    
    dataLoaing: false,      // 一般資料是否載入中
    moreDataLoading: false, // 更多資料是否載入中
    favoriteAdding: false,  // 加入我的最愛是否程序中

    // -- DB 交流
    favorites: [],          // 我的最愛 ID 集合
    favoriteDataList: [],   // 我的最愛資料集合
    hots: [],               // 熱門資料 ID 集合
    hotDataList: [],        // 熱門資料集合
    themes: {               // 主題物件 - 主題名稱、Tag 陣列、資料集合
      "1": {
        themeId: "1",
        themeName: "Rainbow Life!",
        themeTags: ["彩虹", "七彩"],
        themeDataList: []
      },
      "2": {
        themeId: "2",
        themeName: "賞楓秘境",
        themeTags: ["楓", "紅葉"],
        themeDataList: []
      }
    },
  },
  getters: {
    dataList: state => state.dataList,
    allTypeDataList: state => state.allTypeDataList,
    dataDetail: state => state.dataDetail,
    hotDataList: state => state.hotDataList,
    favoriteDataList: state => state.favoriteDataList,
    favorites: state => state.favorites,
    hots: state => state.hots,
    themes: state => state.themes,
    keyword: state => state.keyword,
    currentCity: state => state.currentCity,
    currentTown: state => state.currentTown,
    currentClassType: state => state.currentClassType,
    dataLoaing: state => state.dataLoaing,
    moreDataLoading: state => state.moreDataLoading,
    favoriteAdding: state => state.favoriteAdding
  },
  mutations: {
    // 更改資料
    UPDATE_DATA_LIST: (state, dataList) => state.dataList = dataList,
    UPDATE_MORE_DATA_LIST: (state, dataList) => state.dataList = state.dataList.concat(dataList),
    UPDATE_ALL_TYPE_DATA_LIST: (state, dataList) => state.allTypeDataList = dataList,
    UPDATE_HOT_DATA_LIST: (state, dataList) => state.hotDataList = dataList,
    UPDATE_FAVORITE_DATA_LIST: (state, dataList) => state.favoriteDataList = dataList,
    UPDATE_THEME_DATA_LIST: (state, { index, dataList }) => state.themes[index].themeDataList = dataList,
    UPDATE_DATA_DETAIL: (state, dataDetail) => state.dataDetail = dataDetail,
    CLEAR_DATA_DETAIL: (state) => state.dataDetail = {},

    // 改動過濾條件
    UPDATE_KEYWORD: (state, keyword) => state.keyword = keyword,
    TOGGLE_CITY: (state, cityName) => state.currentCity = cityName,
    TOGGLE_TOWN: (state, townName) => state.currentTown = townName,
    TOGGLE_CLASS_TYPE: (state, classType) => state.currentClassType = classType,

    // 改動資料讀取判定
    UPDATE_DATA_LOADING: (state, toggle) => state.dataLoaing = toggle,
    UPDATE_MORE_DATA_LOADING: (state, toggle) => state.moreDataLoading = toggle,
    UPDATE_FAVORITE_ADDING: (state, isProgress) => state.favoriteAdding = isProgress,

    // 改動我的最愛(旅程)
    SET_FAVORITES: (state, favorites) => state.favorites = favorites,
    ADD_FAVORITES: (state, dataId) => state.favorites.push(dataId),
    REMOVE_FAVORITES: (state, dataId) => state.favorites.splice(state.favorites.indexOf(dataId), 1),

    // 從後端取得主題、熱門資料
    UPDATE_THEMES: (state, themes) => state.themes = themes,
    UPDATE_HOTS: (state, hots) => state.hots = hots,
  },
  actions: {
    // 取得單一類型資料集合
    getSingleTypeDataList({ commit }, dataType) {
      const targetAjax = getSingleType_AJAX(dataType);
      commit("UPDATE_DATA_LOADING", true);
      targetAjax({ select: ['Picture', 'Position'] })
      .then(res => {
        const ids = res.data.map(data => data[`${determineType(data)}ID`]);
        AJAX_S_getScoreByDataList({ ids })
        .then(res1 => {
          const dataList = addCommentScore(res.data, res1.data.average_scores);
          commit("UPDATE_DATA_LIST", dataList);
          commit("UPDATE_DATA_LOADING", false);
        })
      })
      .catch(error => {
        commit("UPDATE_DATA_LOADING", false);
        console.log(`getSingleTypeDataList: ${error}`);
        // 錯誤處理
      });
    },

    // 取得單一類型資料細節
    getSingleTypeDetail({ commit }, id) {
      commit("UPDATE_DATA_LOADING", true);

      // 同時向兩邊的 API 要資料
      Promise.all([AJAX_getDetail({ id }), AJAX_S_getDetail(id)])
      .then(res => {
        // 向後端丟個資料
        this.dispatch("serverModule/postEnterCountToSever", id);
        let data = res[0].data[0];
        data.Comment = res[1].data.comments;
        data.CommentScore = res[1].data.average_score;
        return createCommonIDAndName(data);
      })
      .then(data => {
        const position = {
          latitude: data.Position.PositionLat,
          longitude: data.Position.PositionLon
        };
        Promise.all([
          AJAX_getScenicSpot({ position }),
          AJAX_getRestaurant({ position }),
          AJAX_getHotel({ position }),
          AJAX_getActivity({ position })
        ])
        .then(ress => {
          let allNearbyDataList = concatAndAddType(ress);
          const ids = allNearbyDataList.map(data => data[`${determineType(data)}ID`]);
          AJAX_S_getScoreByDataList({ ids })
          .then(res1 => {
            const nearbyDataList = addCommentScore(allNearbyDataList, res1.data.average_scores);
            data.NearbyDataList = nearbyDataList;
            commit("UPDATE_DATA_DETAIL", data);
            commit("UPDATE_DATA_LOADING", false);
          })
        })
        .catch(error => {
          commit("UPDATE_DATA_LOADING", false);
          console.log(`getSingleTypeDetail: ${error}`);
          // 錯誤處理
        });
      })
      .catch(error => {
        commit("UPDATE_DATA_LOADING", false);
        console.log(`getSingleTypeDetail: ${error}`);
        // 錯誤處理
      });
    },

    // 搜尋附近地點所有類型資料
    getAllTypeDataListWithPosition({ commit }, Position) {
      const position = {
        latitude: Position.PositionLon,
        longitude: Position.PositionLat
      };

      Promise.all([
        AJAX_getScenicSpot({ position, select: ['Picture', 'Position'] }),
        AJAX_getRestaurant({ position, select: ['Picture', 'Position'] }),
        AJAX_getHotel({ position, select: ['Picture', 'Position'] }),
        AJAX_getActivity({ position, select: ['Picture', 'Position'] })
      ])
      .then(ress => {
        const datalist = concatAndAddType(ress);
        commit("UPDATE_ALL_TYPE_DATA_LIST", datalist);
      })
      .catch((error) => {
        console.log(`getAllTypeDataListWithPosition: ${error}`);
        // 錯誤處理
      });
    },

    // 以關鍵字搜尋所有類型資料
    getAllTypeDataListWithKeyword({ commit }, keyword) {
      commit("UPDATE_DATA_LOADING", true);
      Promise.all([
        AJAX_getScenicSpot({ keyword, select: ['Picture'] }),
        AJAX_getRestaurant({ keyword, select: ['Picture'] }),
        AJAX_getHotel({ keyword, select: ['Picture'] }),
        AJAX_getActivity({ keyword, select: ['Picture'] })
      ])
      .then(ress => {
        let allDatalist = concatAndAddType(ress);

        // 資料集合
        const ids = allDatalist.map(data => data[`${determineType(data)}ID`]);

        AJAX_S_getScoreByDataList({ ids })
        .then(res1 => {
          const dataList = addCommentScore(allDatalist, res1.data.average_scores);
          commit("UPDATE_ALL_TYPE_DATA_LIST", dataList);
          commit("UPDATE_KEYWORD", "");
          commit("UPDATE_DATA_LOADING", false);
        })

        // 向後端丟個資料
        this.dispatch("serverModule/postSearchCountToSever", ids);
      })
      .catch(error => {
        commit("UPDATE_DATA_LOADING", false);
        console.log(`getAllTypeDataListWithKeyword: ${error}`);
        // 錯誤處理
      });
    },

    // 以鄉鎮市區過濾資料集合
    filterDataListWithTown({ commit }, { dataType, townName }) {
      const targetAjax = getSingleType_AJAX(dataType);
      commit("UPDATE_DATA_LOADING", true);
      targetAjax({ townName, select: ['Picture'] })
      .then(res => {
        let allDatalist = res.data.map(data => createCommonIDAndName(data));
        const ids = allDatalist.map(data => data[`${determineType(data)}ID`]);
        AJAX_S_getScoreByDataList({ ids })
        .then(res1 => {
          const dataList = addCommentScore(allDatalist, res1.data.average_scores);
          commit("TOGGLE_TOWN", townName);
          commit("UPDATE_DATA_LIST", dataList);
          commit("UPDATE_DATA_LOADING", false);
        })
      })
      .catch(error => {
        commit("UPDATE_DATA_LOADING", false);
        console.log(`filterDataListWithTown: ${error}`);
        // 錯誤處理
      });
    },

    // 以 Class 類型篩選資料集合
    filterDataListByClass({ commit }, { dataType, classType }) {
      commit("UPDATE_DATA_LOADING", true);
      const targetAjax = getSingleType_AJAX(dataType);
      const classObject = { dataType, classType };
      targetAjax({ classObject, select: ['Picture'] })
      .then(res => {
        let allDatalist = res.data.map(data => createCommonIDAndName(data));
        const ids = allDatalist.map(data => data[`${determineType(data)}ID`]);
        AJAX_S_getScoreByDataList({ ids })
        .then(res1 => {
          const dataList = addCommentScore(allDatalist, res1.data.average_scores);
          commit("TOGGLE_CLASS_TYPE", classType);
          commit("UPDATE_DATA_LIST", dataList);
          commit("UPDATE_DATA_LOADING", false);
        })
      })
      .catch(error => {
        commit("UPDATE_DATA_LOADING", false);
        console.log(`filterDataListByClass: ${error}`);
        // 錯誤處理
      });
    },

    // 取得更多資料集合
    getMoreDataList({ commit, state }, dataType) {
      commit("UPDATE_MORE_DATA_LOADING", true);
      // 判斷是否有過濾條件
      const { keyword, currentTown, currentClassType, dataList } = state;
      const targetAjax = getSingleType_AJAX(dataType);
      let queryObj = {
        skip: dataList.length,
        keyword,
        townName: currentTown,
        select: ['Picture']
      };
      if (currentClassType) {
        queryObj.classObject = { dataType, classType: currentClassType };
      }
      targetAjax(queryObj)
      .then(res => {
        let allDatalist = res.data.map(data => createCommonIDAndName(data));
        const ids = allDatalist.map(data => data[`${determineType(data)}ID`]);
        AJAX_S_getScoreByDataList({ ids })
        .then(res1 => {
          const dataList = addCommentScore(allDatalist, res1.data.average_scores);
          commit("UPDATE_MORE_DATA_LIST", dataList);
          commit("UPDATE_MORE_DATA_LOADING", false);
        })
      })
      .catch(error => {
        commit("UPDATE_MORE_DATA_LOADING", false);
        console.log(`getMoreDataList: ${error}`);
        // 錯誤處理
      });
    },

    // 取得熱門景點資料集合
    getHotDataList({ commit, state }, count) {
      commit("UPDATE_DATA_LOADING", true);

      const { hots } = state;
      let hotArray = [];

      if (hots.length === 0) return;
      for (let i = 0; i <= (count || 6); i++) {
        hotArray.push(AJAX_getOneData(hots[i]));
      }

      Promise.all(hotArray)
      .then(ress => {
        const allDatalist = concatAndAddType(ress);
        const ids = allDatalist.map(data => data[`${determineType(data)}ID`]);
        AJAX_S_getScoreByDataList({ ids })
        .then(res1 => {
          const dataList = addCommentScore(allDatalist, res1.data.average_scores);
          commit("UPDATE_HOT_DATA_LIST", dataList);
          commit("UPDATE_DATA_LOADING", false);
        })
      })
      .catch((error) => {
        commit("UPDATE_DATA_LOADING", false);
        console.log(`getHotDataList: ${error}`);
        // 錯誤處理
      });
    },

    // 取得我的旅程資料集合
    getFavoriteDataList({ commit, state }) {
      commit("UPDATE_DATA_LOADING", true);
      const favoriteIds = state.favorites;
      const queryObj = { ids: favoriteIds, select: ['Picture'] };

      if (favoriteIds.length === 0) { commit("UPDATE_DATA_LOADING", false); return; }

      Promise.all([
        AJAX_getScenicSpot(queryObj),
        AJAX_getRestaurant(queryObj),
        AJAX_getHotel(queryObj),
        AJAX_getActivity(queryObj)
      ])
      .then(ress => {
        const allDatalist = concatAndAddType(ress);
        const ids = allDatalist.map(data => data[`${determineType(data)}ID`]);
        AJAX_S_getScoreByDataList({ ids })
        .then(res1 => {
          const dataList = addCommentScore(allDatalist, res1.data.average_scores);
          commit("UPDATE_FAVORITE_DATA_LIST", dataList);
          commit("UPDATE_DATA_LOADING", false);
        })
      })
      .catch(error => {
        commit("UPDATE_DATA_LOADING", false);
        console.log(`getFavoriteDataList: ${error}`);
        // 錯誤處理
      });
    },

    // 取得單一主題景點資料集合
    getThemeDataList({ commit }, { theme, count }) {
      commit("UPDATE_DATA_LOADING", true);
      const { themeTags, themeId } = theme;
      const queryObj = { top: count, tags: themeTags, select: ['Picture'] };
      Promise.all([
        AJAX_getScenicSpot(queryObj),
        AJAX_getRestaurant(queryObj),
        AJAX_getHotel(queryObj),
        AJAX_getActivity(queryObj)
      ])
      .then(ress => {
        const allDatalist = concatAndAddType(ress);
        const ids = allDatalist.map(data => data[`${determineType(data)}ID`]);
        AJAX_S_getScoreByDataList({ ids })
        .then(res1 => {
          const dataList = addCommentScore(allDatalist, res1.data.average_scores);
          commit("UPDATE_THEME_DATA_LIST", { index: themeId, dataList });
          commit("UPDATE_DATA_LOADING", false);
        })
      })
      .catch((error) => {
        commit("UPDATE_DATA_LOADING", false);
        console.log(`getThemeDataList: ${error}`);
        // 錯誤處理
      });
    },

    // 取得所有主題單一類型資料集合
    getSingleTypeThemeDataList({ commit }, dataType) {
      commit("UPDATE_DATA_LOADING", true);
      const targetAjax = getSingleType_AJAX(dataType);
      const themes = this.state.themes;
      let themeArray = new Array();
      for (let theme in themes) {
        themeArray[themeArray.length] = targetAjax(
          { tags: themes[theme].themeTags, select: ['Picture'] }
        )
      }
      Promise.all(themeArray)
      .then(ress => {
        ress.map((res, index) => {
          let allDatalist = res.data.map(data => createCommonIDAndName(data));
          const ids = allDatalist.map(data => data[`${determineType(data)}ID`]);
          AJAX_S_getScoreByDataList({ ids })
          .then(res1 => {
            const dataList = addCommentScore(allDatalist, res1.data.average_scores);
            commit("UPDATE_THEME_DATA_LIST", { index: index + 1, dataList });
            commit("UPDATE_DATA_LOADING", false);
          })
        })
      })
      .catch(error => {
        commit("UPDATE_DATA_LOADING", false);
        console.log(`getSingleTypeThemeDataList: ${error}`);
        // 錯誤處理
      });
    }
  },
  modules: {
    serverModule,
    otherModule
  }
}