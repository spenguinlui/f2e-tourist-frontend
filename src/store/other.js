import L from 'leaflet';

import { determineIcon, createMarkerPopupObj } from "@/modules/map-support";

export default {
  namespaced: true,
  state: {
    mapMode: false,        // 是否切換地圖瀏覽模式
    mapClass: {},          // 全域地圖物件
  },
  getters: {
    adding: state => state.adding,
    mapMode: state => state.mapMode,
  },
  mutations: {
    REMOVE_SHOW_PICTURE: state => state.showPicture = "",
    UPDATE_SHOW_PICTURE: (state, PictureUrl) => state.showPicture = PictureUrl,

    TOGGLE_MAP_MODE: (state, mapMode) => state.mapMode = mapMode,
    SET_MAP_MODE_OBJECT: (state, mapClass) => state.mapClass = mapClass,
  },
  actions: {
    // 從瀏覽器取得我的最愛
    getFavorites({ commit }) {
      const heartArray = JSON.parse(localStorage.getItem("touristHeart"));
      if (heartArray) commit("SET_FAVORITES", heartArray, { root: true });
    },

    // 將我的最愛更新後存入瀏覽器
    changeFavoriteToData({ commit, rootState }, { dataId, add }) {
      commit("UPDATE_FAVORITE_ADDING", true, { root: true });
      
      if (add) {
        commit("ADD_FAVORITES", dataId, { root: true })
      } else {
        commit("REMOVE_FAVORITES", dataId, { root: true });
      }
      // 向後端丟個資料
      this.dispatch("serverModule/postFavoriteCountToSever", { dataId, add });

      localStorage.setItem("touristHeart", JSON.stringify(rootState.favorites));

      commit("UPDATE_FAVORITE_ADDING", false, { root: true });
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