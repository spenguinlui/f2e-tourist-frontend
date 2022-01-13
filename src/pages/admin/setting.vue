<template>
  <div>
    <h2>參數設定</h2>
    <span>說明: 熱門景點評分 = 搜尋次數 X (search_weight) + 進入詳細頁面次數 X (enter_weight) + (被加入喜愛次數 - 移除喜愛次數) X (favorite_weight)</span>
    <table>
      <thead>
        <tr>
          <td>設定名稱</td>
          <td>設定數值</td>
          <td>按鈕</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(setting, index) in settings" :key="setting.themeId">
          <td><input type="text" v-model="setting.attribute_name" style="border: 1px #ddd solid"></td>
          <td><input type="text" v-model="setting.attribute_value" style="border: 1px #ddd solid"></td>
          <td><button @click="updateSetting(setting.id, index)" style="border: 2px #666 solid">更新</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('serverModule', ['settings'])
  },
  methods: {
    updateSetting(id, index) {
      const settingParams = {
        attribute_name: this.settings[index].attribute_name,
        attribute_value: this.settings[index].attribute_value,
        settingId: id
      }
      this.$store.dispatch("serverModule/updateSettingToServer", { settingParams, vm: this });
    }
  },
  created() {
    this.$store.dispatch("serverModule/getSettingByServer", { vm: this });
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/main.scss";


</style>