<template>
  <ul class="stars">
    <li><img
      :src="score >= 1 ? require('../assets/images/icon/star-filled.svg') : require('../assets/images/icon/star-grey.svg')"
      :alt="score >= 1 ? '滿星icon' : '空星icon'"></li>
    <li><img
      :src="score >= 2 ? require('../assets/images/icon/star-filled.svg') : require('../assets/images/icon/star-grey.svg')"
      :alt="score >= 2 ? '滿星icon' : '空星icon'"></li>
    <li><img
      :src="score >= 3 ? require('../assets/images/icon/star-filled.svg') : require('../assets/images/icon/star-grey.svg')"
      :alt="score >= 4 ? '滿星icon' : '空星icon'"></li>
    <li><img
      :src="score >= 4 ? require('../assets/images/icon/star-filled.svg') : require('../assets/images/icon/star-grey.svg')"
      :alt="score >= 4 ? '滿星icon' : '空星icon'"></li>
    <li><img
      :src="score >= 5 ? require('../assets/images/icon/star-filled.svg') : require('../assets/images/icon/star-grey.svg')"
      :alt="score >= 5 ? '滿星icon' : '空星icon'"></li>
  </ul>
</template>

<script>
export default {
  props: ['score']
}
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/main.scss";

  .stars {
    @include flex-row-flex-start-center;
    li {
      img {
        width: 100%;
      }
    }
  }
</style>