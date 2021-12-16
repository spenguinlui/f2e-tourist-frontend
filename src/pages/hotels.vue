<template>
  <div class="container-fluid">
    <ClassBenner/>
    <CardList />
  </div>
</template>

<script>
import ClassBenner from '../components/class_benner.vue';
import CardList from "./card-list.vue";

export default {
  name: 'hotels',
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
    this.$store.dispatch("getSingleTypeDataList", "hotels");
  }
}
</script>
