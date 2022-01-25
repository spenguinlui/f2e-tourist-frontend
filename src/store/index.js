import {
  AJAX_getDetail,
  AJAX_getOneData,
  getSingleType_AJAX,
  triggerAjax
} from "@/modules/api";

import {
  AJAX_S_getDetail,
  AJAX_S_getScoreByDataList
} from "@/modules/server-api";

import { createCommonIDAndName, determineType, addCommentScore, concatAndAddType, deepCopy } from "@/modules/data-support";

import serverModule from "./server";
import otherModule from "./other";

export const storeObject = {
  state: {
    dataList: [],           // 單一類型資料集合
    allTypeDataList: [],    // 所有類型資料集合
    dataDetail: {},         // 指定資料詳細內容
    ptxData: {              // API 抓回來的資料
      dataList: [],         // 資料集合
      query: {              // 該資料集合的搜尋條件快照
        dataType: "all",    // 該資料集合類型 all/scenicspots/activities/restaurants/hotels
        top: 30,            // 回傳資料數量
        select: [],         // 欄位過濾
        position: {         // 座標過濾
          latitude: "",
          longitude: ""
        },
        skips: {            // 各資料位移量
          scenicspots: 0,
          restaurants: 0,
          hotels: 0,
          activities: 0
        },
        keyword: "",        // 關鍵字過濾
        townName: "",       // 鄉鎮市區過濾
        ids: [],            // 指定資料集合
        tags: [],           // 指定 Tag 搜尋
        classType: ""       //指定 class 過濾
      }
    },
    
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
    ptxData: state => state.ptxData,
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
    UPDATE_DATA_LIST: (state, dataList) => state.ptxData.dataList = dataList,
    UPDATE_MORE_DATA_LIST: (state, dataList) => state.ptxData.dataList = state.ptxData.dataList.concat(dataList),
    UPDATE_ALL_TYPE_DATA_LIST: (state, dataList) => state.allTypeDataList = dataList,
    UPDATE_HOT_DATA_LIST: (state, dataList) => state.hotDataList = dataList,
    UPDATE_FAVORITE_DATA_LIST: (state, dataList) => state.favoriteDataList = dataList,
    UPDATE_THEME_DATA_LIST: (state, { index, dataList }) => state.themes[index].themeDataList = dataList,
    UPDATE_DATA_DETAIL: (state, dataDetail) => state.dataDetail = dataDetail,
    CLEAR_DATA_DETAIL: (state) => state.dataDetail = {},
    
    // 改動過濾條件
    UPDATE_DATA_QUERY: (state, query) => state.ptxData.query = { ...state.ptxData.query, ...query },
    UPDATE_KEYWORD: (state, keyword) => state.keyword = keyword,
    TOGGLE_CITY: (state, cityName) => state.currentCity = cityName,
    TOGGLE_TOWN: (state, townName) => state.currentTown = townName,
    TOGGLE_CLASS_TYPE: (state, classType) => state.currentClassType = classType,
    INIT_DATA_QUERY: (state) => state.ptxData.query = {dataType:"all",top:30,select:[],position:{latitude:"",longitude:""},skips:{scenicspots:0,restaurants:0,hotels:0,activities: 0},keyword:"",townName:"",ids:[],tags:[],classType: ""},

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
    getSingleTypeDataList({ commit, state }, dataType) {
      commit("UPDATE_DATA_LOADING", true);
      let queryObj = deepCopy(state.ptxData.query);
      queryObj.dataType = dataType;

      triggerAjax(
        queryObj,
        (dataList, query) => {
          queryObj = query;
          commit("UPDATE_DATA_LIST", dataList);
          commit("UPDATE_DATA_QUERY", queryObj);
          commit("UPDATE_DATA_LOADING", false);
        },
        (error) => {
          commit("UPDATE_DATA_LOADING", false);
          console.log(`getSingleTypeDataList: ${error}`);
          // 錯誤處理
        }
      );
    },

    // 搜尋附近地點所有類型資料
    getAllTypeDataListWithPosition({ commit, state }, Position) {
      commit("UPDATE_DATA_LOADING", true);
      let queryObj = deepCopy(state.ptxData.query);
      queryObj.position = {
        latitude: Position.PositionLon,
        longitude: Position.PositionLat
      };
      queryObj.top = 6;

      triggerAjax(
        queryObj,
        (datalist) => {
          commit("UPDATE_ALL_TYPE_DATA_LIST", datalist);
        },
        (error) => {
          commit("UPDATE_DATA_LOADING", false);
          console.log(`getAllTypeDataListWithPosition: ${error}`);
          // 錯誤處理
        }
      );
    },

    // 以關鍵字搜尋所有類型資料
    getAllTypeDataListWithKeyword({ commit, state }, keyword) {
      commit("UPDATE_DATA_LOADING", true);
      let queryObj = deepCopy(state.ptxData.query);
      queryObj.keyword = keyword;
      queryObj.top = 6;

      triggerAjax(
        queryObj,
        (dataList, query, ids) => {
          queryObj = query;
          commit("UPDATE_DATA_LIST", dataList);
          commit("UPDATE_KEYWORD", "");
          commit("UPDATE_DATA_QUERY", queryObj);
          commit("UPDATE_DATA_LOADING", false);
          this.dispatch("serverModule/postSearchCountToSever", ids); // 向後端丟個資料
        },
        (error) => {
          commit("UPDATE_DATA_LOADING", false);
          console.log(`getAllTypeDataListWithKeyword: ${error}`);
          // 錯誤處理
        }
      );
    },

    // 以鄉鎮市區過濾資料集合
    filterDataListWithTown({ commit, state }, { townName }) {
      commit("UPDATE_DATA_LOADING", true);
      let queryObj = deepCopy(state.ptxData.query);
      queryObj.townName = townName;
      queryObj.skips = {
        scenicspots: 0, restaurants: 0, hotels: 0, activities: 0
      };

      triggerAjax(
        queryObj,
        (dataList, query) => {
          queryObj = query;
          commit("TOGGLE_TOWN", townName);
          commit("UPDATE_DATA_LIST", dataList);
          commit("UPDATE_DATA_QUERY", queryObj);
          commit("UPDATE_DATA_LOADING", false);
        },
        (error) => {
          commit("UPDATE_DATA_LOADING", false);
          console.log(`filterDataListWithTown: ${error}`);
          // 錯誤處理
        }
      )
    },

    // 以 Class 類型篩選資料集合
    filterDataListByClass({ commit, state }, { classType }) {
      commit("UPDATE_DATA_LOADING", true);
      let queryObj = deepCopy(state.ptxData.query);
      queryObj.classType = classType;
      queryObj.skips = {
        scenicspots: 0, restaurants: 0, hotels: 0, activities: 0
      };

      triggerAjax(
        queryObj,
        (dataList, query) => {
          queryObj = query;
          commit("TOGGLE_CLASS_TYPE", classType);
          commit("UPDATE_DATA_LIST", dataList);
          commit("UPDATE_DATA_QUERY", queryObj);
          commit("UPDATE_DATA_LOADING", false);
        },
        (error) => {
          commit("UPDATE_DATA_LOADING", false);
          console.log(`filterDataListByClass: ${error}`);
          // 錯誤處理
        }
      )
    },

    // 取得更多資料集合
    getMoreDataList({ commit, state }) {
      commit("UPDATE_MORE_DATA_LOADING", true);
      const { ptxData } = state;
      let queryObj = deepCopy(ptxData.query);

      triggerAjax(
        queryObj,
        (dataList, query) => {
          queryObj = query;
          commit("UPDATE_MORE_DATA_LIST", dataList);
          commit("UPDATE_DATA_QUERY", queryObj);
          commit("UPDATE_MORE_DATA_LOADING", false);
        },
        (error) => {
          commit("UPDATE_MORE_DATA_LOADING", false);
          console.log(`getMoreDataList: ${error}`);
          // 錯誤處理
        }
      )
    },

    // 取得單一類型資料細節
    getSingleTypeDetail({ commit }, id) {
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
        // 取得單一類型資料後，在搜尋與它相關的資料
        const queryObj = {
          dataType: "all",
          position: {
            latitude: data.Position.PositionLat,
            longitude: data.Position.PositionLon
          }
        };
        triggerAjax(
          queryObj,
          (dataList) => {
            data.NearbyDataList = dataList;
            commit("UPDATE_DATA_DETAIL", data);
          },
          (error) => {
            commit("UPDATE_DATA_LOADING", false);
            console.log(`getSingleTypeDetail: ${error}`);
            // 錯誤處理
          }
        );
      })
      .catch(error => {
        commit("UPDATE_DATA_LOADING", false);
        console.log(`getSingleTypeDetail: ${error}`);
        // 錯誤處理
      });
    },

    // 取得熱門景點資料集合
    getHotDataList({ commit, state }, { count, callbackFn }) {
      const { hots } = state;
      let hotArray = [];

      // 不改變陣列順序依序要資料
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
          if (callbackFn) callbackFn();
        })
      })
      .catch((error) => {
        if (callbackFn) callbackFn();
        console.log(`getHotDataList: ${error}`);
        // 錯誤處理
      });
    },

    // 取得我的旅程資料集合
    getFavoriteDataList({ commit, state }) {
      commit("UPDATE_DATA_LOADING", true);
      const favoriteIds = state.favorites;
      const queryObj = {
        dataType: "all",
        ids: favoriteIds,
        select: ['Picture', 'Position']
      };

      // 無條件去搜尋會得到一般結果，所以要直接丟回空陣列
      if (favoriteIds.length === 0) {
        commit("UPDATE_FAVORITE_DATA_LIST", []);
        commit("UPDATE_DATA_LOADING", false); return;
      }

      triggerAjax(
        queryObj,
        (dataList) => {
          commit("UPDATE_FAVORITE_DATA_LIST", dataList);
          commit("UPDATE_DATA_LOADING", false);
        },
        (error) => {
          commit("UPDATE_DATA_LOADING", false);
          console.log(`getFavoriteDataList: ${error}`);
          // 錯誤處理
        }
      )
    },

    // 取得單一主題景點資料集合
    getThemeDataList({ commit }, { theme, count, callbackFn }) {
      commit("UPDATE_DATA_LOADING", true);
      const { themeTags, themeId } = theme;
      const queryObj = { 
        dataType: "all",
        top: count,
        tags: themeTags,
        select: ['Picture', 'Position'],
      };
      triggerAjax(
        queryObj,
        (dataList) => {
          commit("UPDATE_THEME_DATA_LIST", { index: themeId, dataList });
          commit("UPDATE_DATA_LOADING", false);
          if (callbackFn) callbackFn();
        },
        (error) => {
          commit("UPDATE_DATA_LOADING", false);
          if (callbackFn) callbackFn();
          console.log(`getThemeDataList: ${error}`);
          // 錯誤處理
        }
      )
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