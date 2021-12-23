<template>
  <div class="container-fluid">
    <ClassBenner/>
    <CardList v-if="!mapMode"/>
    <MapList v-else/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ClassBenner from '../components/class-benner.vue';
import CardList from "./card-list.vue";
import MapList from "./map-list.vue";

export default {
  name: 'restaurants',
  computed: {
    ...mapGetters(['mapMode'])
  },
  components: {
    ClassBenner,
    CardList,
    MapList
  },
  created() {
    this.$store.dispatch("getSingleTypeDataList", "restaurants");
  },
  updated() {
    if (this.mapMode) this.$store.dispatch("setMarkerOnMap", 0);
  }
}
</script>
