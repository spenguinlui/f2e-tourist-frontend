<template>
  <div>
    <h2>參數設定</h2>
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