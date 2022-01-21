import Vue from 'vue';
import App from '@/App.vue';

import { AJAX_S_checkSupplierLogin, AJAX_S_checkAdminLogin } from '@/modules/server-api';

// Router
import Router from 'vue-router';
import { routes } from '@/route';
Vue.use(Router);
const router = new Router({
  linkExactActiveClass: 'active',
  linkActiveClass: 'active',
  base: process.env.PUBLIC_PATH,
  routes
});

// vuex
import Vuex from 'vuex';
import { storeObject } from '@/store/index';
Vue.use(Vuex);
const store = new Vuex.Store(storeObject);

// map
import 'leaflet/dist/leaflet.css';

// cookies
import VueCookie from 'vue-cookies';
Vue.use(VueCookie);

// Oauth - google
import GAuth from 'vue-google-oauth2';
const gauthOption = {
  clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID,
  scope: 'profile email',
  prompt: 'select_account'
}
Vue.use(GAuth, gauthOption)

// setting
Vue.config.productionTip = false;
Vue.prototype.window = window;

// 建立 vue
const vm = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

// Oauth - facebook
import { initFacebookSdk } from '@/modules/fb.js';
initFacebookSdk().then(vm);

// 守門員
router.beforeEach((to, _, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (to.name.includes("admin")) {
      const adminAuthToken = vm.$cookies.get('_a');
      const adminParams = { auth_token: adminAuthToken };
      AJAX_S_checkAdminLogin(adminParams)
      .then(res => {
        if (res.data.success) {
          next();
        } else {
          next({ name: 'admin-login' });
        }
      })
      .catch(() => {
        next({ name: 'admin-login' });
      })
    } else if (to.name.includes("suppliers")) {
      const supplierAuthToken = vm.$cookies.get('_s');
      const supplierParams = { auth_token: supplierAuthToken }
      AJAX_S_checkSupplierLogin(supplierParams)
      .then(res => {
        if (res.data.success) {
          next();
        } else {
          next({ name: 'supplier-login' });
        }
      })
      .catch(() => {
        next({ name: 'supplier-login' });
      })
    } else {
      next();
    }
  } else {
    if (to.name === "scenicspots" || to.name === "restaurants" || to.name === "hotels") {
      vm.$store.commit("otherModule/TOGGLE_MAP_MODE", false);
    } else if (to.name === "detail") {
      vm.$store.commit("CLEAR_DATA_DETAIL");
    }
    next();
  }
})
