<template>
  <div class="not-found">
    <h1>找不到頁面</h1>
  </div>
</template>

<style lang="scss" scoped>
  @import "@/assets/scss/main.scss";

  .not-found {
    @include flex-row-center-center;
    @include font-h3(bold);
    width: 100%;
    color: $grey-300;
    padding: 20vh 0;
  }
</style>