<template>
  <ul class="stars">
    <li><img src="../assets/images/icon/star-filled.svg" alt="滿星icon"></li>
    <li><img src="../assets/images/icon/star-filled.svg" alt="滿星icon"></li>
    <li><img src="../assets/images/icon/star-filled.svg" alt="滿星icon"></li>
    <li><img src="../assets/images/icon/half-star-filled.svg" alt="半星icon"></li>
    <li><img src="../assets/images/icon/star-outline.svg" alt="空星icon"></li>
  </ul>
</template>

<script>
export default {
  
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