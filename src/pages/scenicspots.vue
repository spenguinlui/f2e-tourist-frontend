<template>
  <div class="container-fluid">
    <ClassBenner/>
    <CardList />
  </div>
</template>

<script>
import ClassBenner from "../components/class_benner.vue";
import CardList from "./card-list.vue";

export default {
  name: 'scenicspots',
  data() {
    return {

    }
  },
  components: {
    ClassBenner,
    CardList
  },
  methods: {
  },
  created() {
    this.$store.dispatch("getSingleTypeDataList", "scenicspots");
  }
}
</script>
