<template>
  <div>
    <h1>廠商專區</h1>
    <button @click="signOut">廠商登出</button>
  </div>
</template>

<script>
import { AJAX_S_checkSupplierLogin } from '@/modules/server-api';

export default {
  methods: {
    signOut() {
      this.$store.dispatch("serverModule/signOutSupplierOnServer", this);
    }
  },
  created() {
    // 防止 router 守衛沒啟動
    const supplierAuthToken = this.$cookies.get('_s');
    const supplierParams = { auth_token: supplierAuthToken }
    AJAX_S_checkSupplierLogin(supplierParams)
    .then(res => {
      if (res.data.success) {
        return;
      } else {
        this.$router.push({ name: 'supplier-login' });
      }
    })
    .catch(() => {
      this.$router.push({ name: 'supplier-login' });
    })
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/main.scss";

</style>