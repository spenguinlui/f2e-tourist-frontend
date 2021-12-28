<template>
  <div class="nearby-map" id="nearby-map"></div>
</template>

<script>
import L from 'leaflet';
import { mapGetters } from 'vuex';
import { determineIcon, createMarkerPopupObj } from "@/modules/map-support";
import { determineTypeByID } from "@/modules/data-support";

export default {
  props: ['dataList'],
  data() {
    return {
      mapClass: {}
    }
  },
  computed: {
    ...mapGetters(['dataDetail'])
  },
  watch: {
    dataDetail: {
      handler() {
        this.initMap(); // 有資料才掛上地圖，非同步資料一定會比 dom mouted 慢
      },
      deep: true
    }
  },
  methods: {
    initMap() {
      const currentPosition = {
        latitude: this.dataDetail.Position.PositionLat,
        longitude: this.dataDetail.Position.PositionLon
      }

      let map = this.mapClass;
      
      // 判斷 DOM 是不是被 leaflet 動過了，沒有就初始化
      if (Object.keys(map).length === 0) {
        map = this.mapClass = L.map('nearby-map')
          .setView([currentPosition.latitude, currentPosition.longitude], 16);
  
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          opacity: 0.5
        }).addTo(map);
      } else {
        map.flyTo([currentPosition.latitude, currentPosition.longitude], 16);
      }

      const markerLayer = new L.LayerGroup().addTo(map);

      this.dataList.forEach((data) => {
        const { PositionLat, PositionLon } = data.Position;
        L.marker([PositionLat, PositionLon], { icon: determineIcon(data.ID) })
          .bindPopup(
            createMarkerPopupObj(data),
            {
              minWidth: 170,
              offset: [0, -30],
              className: `nearby-map-card ${determineTypeByID(data.ID)}`
            }
          )
          .addTo(markerLayer);
      })

      if (map.tap) map.tap.disable();  // 這是防止部分瀏覽器 popup 失效
      this.mapClass = map;
    }
  },
  beforeDestroy(){
    // 離開前把 marker 都清光
    this.mapClass.eachLayer(layer => { 
      if (!(layer instanceof L.TileLayer)) {
        this.mapClass.removeLayer(layer);
      }
    });
  }
}
</script>

<style lang="scss">
  @import "@/assets/scss/main.scss";

  .nearby-map {
    width: 100%;
    height: 100%;
    border-radius: .5rem;
    z-index: 0;
  }

  // leaflet
  .leaflet-popup-content-wrapper {
    box-shadow: none;
  }
  .leaflet-popup-tip-container {
    display: none;
  }
  .leaflet-popup-content {
    margin: 0;
  }
  .leaflet-popup-close-button {
    display: none;
  }
  .leaflet-popup {
    .leaflet-popup-content-wrapper {
      border-radius: .5rem;
      .leaflet-popup-content {
        .card-img {
          padding: 1rem;
          > img {
            height: 6rem;         // 用固定高度 
            border-radius: .5rem;
          }
        }
        .card-content-title {
          @include font-button(bold);
          color: $grey-700;
        }
      }
    }
    &.scenicspots .leaflet-popup-content-wrapper,
    &.ScenicSpot .leaflet-popup-content-wrapper {
      border: 1px solid $primary-800;
    }
    &.activities .leaflet-popup-content-wrapper,
    &.Activity .leaflet-popup-content-wrapper {
      border: 1px solid #09097c;
    }
    &.restaurants .leaflet-popup-content-wrapper,
    &.Restaurant .leaflet-popup-content-wrapper {
      border: 1px solid $accent-800;
    }
    &.hotels .leaflet-popup-content-wrapper,
    &.Hotel .leaflet-popup-content-wrapper {
      border: 1px solid $alert-600;
    }
  }

</style>