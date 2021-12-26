<template>
  <section class="no-content">
    <p>無資料</p>
  </section>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/main.scss";

  .no-content {
    @include flex-row-center-center;
    @include font-h3(bold);
    width: 100%;
    height: 100%;
    color: $grey-300;
    padding: 3rem 0;
  }
</style>