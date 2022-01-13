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
import { AJAX_S_checkAdminLogin } from '@/modules/server-api';

export default {
  created() {
    // 防止 router 守衛沒啟動
    const adminAuthToken = this.$cookies.get('_a');
      const adminParams = { auth_token: adminAuthToken };
      AJAX_S_checkAdminLogin(adminParams)
      .then(res => {
        if (res.data.success) {
          return;
        } else {
          this.$router.push({ name: 'admin-login' });
        }
      })
      .catch(() => {
        this.$router.push({ name: 'admin-login' });
      })
  }
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