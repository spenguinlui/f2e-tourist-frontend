<template>
  <div>
    <h2>廠商管理</h2>
    <table>
      <thead>
        <tr>
          <td>廠商名稱</td>
          <td>負責項目</td>
          <td>按鈕</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(supplier) in suppliers" :key="supplier.id">
          <td>{{ supplier.name }}</td>
          <td>{{ supplier.local_item_id }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  methods: {
    getSupplierProfile() {
      this.$store.dispatch("serverModule/getSupplier", { vm: this });
    }
  },
  computed: {
    ...mapGetters('serverModule', ['suppliers'])
  },
  mounted() {
    this.getSupplierProfile();
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/main.scss";


</style>