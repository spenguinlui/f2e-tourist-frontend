import L from 'leaflet';

import { determineIcon, createMarkerPopupObj } from "@/modules/map-support";

export default {
  namespaced: true,
  state: {
    showPicture: "",       // 頁面細節顯示大圖
    adding: false,         // 加入我的最愛是否程序中
    mapMode: false,        // 是否切換地圖瀏覽模式
    mapClass: {},          // 全域地圖物件
  },
  getters: {
    showPicture: state => state.showPicture,
    adding: state => state.adding,
    mapMode: state => state.mapMode,
  },
  mutations: {
    SET_SHOW_PICTURE: (state, PictureUrl) => state.showPicture = PictureUrl,
    REMOVE_SHOW_PICTURE: state => state.showPicture = "",
    UPDATE_SHOW_PICTURE: (state, PictureUrl) => state.showPicture = PictureUrl,

    UPDATE_ADDING: (state, isProgress) => state.adding = isProgress,

    TOGGLE_MAP_MODE: (state, mapMode) => state.mapMode = mapMode,
    SET_MAP_MODE_OBJECT: (state, mapClass) => state.mapClass = mapClass,
  },
  actions: {
    // 更改細節頁面目前顯示大圖
    changeDetailShowPicture({ commit }, PictureUrl) {
      commit("UPDATE_SHOW_PICTURE", PictureUrl);
    },

    // 從瀏覽器取得我的最愛
    getFavorites({ commit }) {
      const heartArray = JSON.parse(localStorage.getItem("touristHeart"));
      if (heartArray) commit("SET_FAVORITES", heartArray, { root: true });
    },

    // 將我的最愛更新後存入瀏覽器
    changeFavoriteToData({ commit, rootState }, { dataId, add }) {
      commit("UPDATE_ADDING", true);
      
      add ? commit("ADD_FAVORITES", dataId, { root: true }) : commit("REMOVE_FAVORITES", dataId, { root: true });
      localStorage.setItem("touristHeart", JSON.stringify(rootState.favorites));

      commit("UPDATE_ADDING", false);
    },

    // 在地圖上打入景點 marker
    setMarkerOnMap({ state, rootState }) {
      if (rootState.dataList.length === 0) return;
      const mapClass = state.mapClass;
      const markerLayer = new L.LayerGroup().addTo(mapClass);

      rootState.dataList.forEach((data) => {
        const { PositionLat, PositionLon } = data.Position;
        L.marker([PositionLat, PositionLon], { icon: determineIcon(data.ID) })
          .bindPopup(
            createMarkerPopupObj(data),
            {
              minWidth: 200,
              offset: [0, -30],
              className: `map-card ${data.Type}`
            }
          )
          .addTo(markerLayer);
      })
      if (mapClass.tap) mapClass.tap.disable();
      const firstPositionLat = rootState.dataList[0].Position.PositionLat;
      const firstPositionLon = rootState.dataList[0].Position.PositionLon;
      mapClass.flyTo([firstPositionLat, firstPositionLon], 16, {
        animate: true,
        duration: 1.5
      });
    },
  }
}