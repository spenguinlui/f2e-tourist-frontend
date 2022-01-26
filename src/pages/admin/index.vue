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
    .then(() => {
      return;
    })
    .catch(() => {
      delete_cookie('_a', '/', 'localhost');
      this.$router.push({ name: 'admin-login' });
    })
  }
}

// 套件的刪不掉，刪除 cookie 補丁
function delete_cookie( name, path, domain ) {
  if( get_cookie( name ) ) {
    document.cookie = name + "=" +
      ((path) ? ";path="+path:"")+
      ((domain)?";domain="+domain:"") +
      ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
  }
}

function get_cookie(name){
  return document.cookie.split(';').some(c => {
      return c.trim().startsWith(name + '=');
  });
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