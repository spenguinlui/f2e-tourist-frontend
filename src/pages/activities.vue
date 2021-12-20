<template>
  <div class="container-fluid">
    <ClassBenner/>
    <CardList />
  </div>
</template>

<script>
import ClassBenner from '../components/class-benner.vue';
import CardList from "./card-list.vue";

export default {
  name: 'activities',
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
    this.$store.dispatch("getSingleTypeDataList", "activities");
  }
}
</script>