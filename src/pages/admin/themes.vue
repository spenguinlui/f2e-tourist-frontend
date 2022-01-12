<template>
  <div>
    <h2>主題管理</h2>
    <h3>新增主題</h3>
    <input type="text" v-model="newThemeName" style="border: 1px #ddd solid">
    <input type="text" v-model="newThemeTags" style="border: 1px #ddd solid">
    <button @click="addNewTheme" style="border: 2px #666 solid">新增</button>
    <table>
      <thead>
        <tr>
          <td>主題名稱</td>
          <td>主題 Tag</td>
          <td>按鈕</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="theme in themes" :key="theme.themeId">
          <td><input type="text" v-model="theme.themeName" style="border: 1px #ddd solid"></td>
          <td><input type="text" v-model="theme.themeTags" style="border: 1px #ddd solid"></td>
          <td><button @click="updateTheme(theme.themeId)" style="border: 2px #666 solid">更新</button></td>
          <td><button @click="deleteTheme(theme.themeId)" style="border: 2px #666 solid">刪除</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      newThemeName: "",
      newThemeTags: ""
    }
  },
  computed: {
    // localTheme() {
    //   return this.themes;
    // },
    ...mapGetters(['themes'])
  },
  methods: {
    updateTheme(themeId) {
      const themeParams = {
        theme_name: this.themes[themeId].themeName,
        theme_tags: this.themes[themeId].themeTags
      };
      this.$store.dispatch("serverModule/updateThemeToServer", { themeId, themeParams, vm: this });
      this.$store.dispatch("serverModule/getThemesByServer");
    },
    addNewTheme() {
      const themeParams = {
        theme_name: this.newThemeName,
        theme_tags: this.newThemeTags
      };
      this.$store.dispatch("serverModule/addThemeToServer", { themeParams, vm: this });
    },
    deleteTheme(themeId) {
      this.$store.dispatch("serverModule/deleteThemeToServer", { themeId, vm: this });
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/main.scss";


</style>