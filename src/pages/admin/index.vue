<template>
  <div>
    <h1>管理頁面</h1>
    <div class="btn-group">
      <router-link :to="{ name: 'admin-themes' }" class="btn">主題管理</router-link> 
      <router-link :to="{ name: 'admin-users' }" class="btn">使用者管理</router-link> 
      <router-link :to="{ name: 'admin-suppliers' }" class="btn">商家管理</router-link> 
      <router-link :to="{ name: 'admin-setting' }" class="btn">參數設定</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/main.scss";

  .btn-group {
    @include flex-row-center-center;
    .btn {
      @include btn-outline;
      @include btn-text;
      margin-right: .5rem;
    }
  }

</style>