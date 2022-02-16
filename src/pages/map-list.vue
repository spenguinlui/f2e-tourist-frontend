<template>
  <section class="map-content">
    <template v-if="ptxData.dataList.length > 0">
      <aside class="card-aside">
        <div v-for="data in ptxData.dataList" :key="data.ID" class="card-container">
          <Card
            :data="data" :type="dataType"
            :classType="'full-card'"
            />
        </div>
      </aside>
      <div class="map-mode" id="map"></div>
    </template>
    <template v-else>
      <NoContent />
    </template>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import L from 'leaflet';

import Card from "@/components/card.vue";
import NoContent from '@/components/no-content.vue';

export default {
  computed: {
    dataType() {
      return this.$route.name
    },
    ...mapGetters(['ptxData', 'favorites']),
  },
  methods: {
    initMap() {
      // 預設第一個景點位置
      const currentPosition = {
        latitude: "25.046951",
        longitude: "121.516887",  // 預設台北火車站
      }
      const map = L.map('map', { zoomControl: false })
        .setView([currentPosition.latitude, currentPosition.longitude], 16);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        opacity: 0.5
      }).addTo(map);

      this.$store.commit("otherModule/SET_MAP_MODE_OBJECT", map);
    }
  },
  mounted() {
    if (this.ptxData.dataList.length > 0) this.initMap();
  },
  components: {
    Card,
    NoContent
  }
}
</script>

<style lang="scss">
  @import "@/assets/scss/main.scss";

  .map-content {
    @include flex-row-flex-start-center;
    @include content-padding(1.5rem);
    height: calc(100vh - #{$nav-height} - #{$class-benner-m-height} - #{$benner-m-menu-height} - #{$footer-height});
    .card-aside {
      display: none;
      .card-container {
        width: 100%;
        padding: 1rem 1rem;
      }
    }
  
    .map-mode {
      @include flex-col(12);
      height: 100%;
      border-radius: .5rem;
      z-index: 0;
    }
  }

  @include screen-up {
    .map-content {
      @include content-padding(1.5rem, true);
      height: calc(100vh - #{$nav-height} - #{$class-benner-height} - #{$footer-height});
      .card-aside {
        @include flex-column-flex-start-center;
        @include flex-col(5);
        @include scroll;
        height: 100%;
        .card-container {
          &:nth-child(1) {
            padding-top: 0;
          }
        }
      }
      .map-mode {
        @include flex-col(7);
      }
    }
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