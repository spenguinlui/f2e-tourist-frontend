<template>
  <div>
    <h2>使用者管理</h2>
    <table>
      <thead>
        <tr>
          <td>會員Email</td>
          <td>珍藏名單(資料ID)</td>
          <td>按鈕</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.email }}</td>
          <td>{{ user.favorites }}</td>
          <td><button @click="deleteUser(user.id)" style="border: 2px #666 solid">刪除</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('serverModule', ['users'])
  },
  methods: {
    deleteUser() {
      window.alert("尚未開放")
    }
  },
  created() {
    this.$store.dispatch("serverModule/getUsersByServer", { vm: this });
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/main.scss";


</style>