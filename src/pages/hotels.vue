<template>
  <div>
    <ClassBenner/>
    <CardList v-if="!mapMode"/>
    <MapList v-else/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ClassBenner from '@/components/class-benner.vue';
import CardList from "@/pages/card-list.vue";
import MapList from "@/pages/map-list.vue";

export default {
  name: 'hotels',
  computed: {
    ...mapGetters('otherModule', ['mapMode'])
  },
  components: {
    ClassBenner,
    CardList,
    MapList
  },
  created() {
    this.$store.dispatch("getSingleTypeDataList", "hotels");
  },
  updated() {
    if (this.mapMode) this.$store.dispatch("otherModule/setMarkerOnMap", 0);
  }
}
</script>
