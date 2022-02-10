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
  mode: 'history',
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
      .then(() => {
        next();
      })
      .catch(() => {
        vm.delete_cookie('_a', '/', 'localhost');
        next({ name: 'admin-login' });
      })
    } else if (to.name.includes("suppliers")) {
      const supplierAuthToken = vm.$cookies.get('_s');
      const supplierParams = { auth_token: supplierAuthToken }
      AJAX_S_checkSupplierLogin(supplierParams)
      .then(() => {
        next();
      })
      .catch(() => {
        vm.delete_cookie('_s', '/', 'localhost');
        next({ name: 'supplier-login' });
      })
    } else {
      next();
    }
  } else {
    if (
      to.name === "scenicspots" || to.name === "restaurants" || to.name === "hotels"
      || to.name === "activities" || to.name === "search"
    ) {
      vm.$store.commit("INIT_DATA_QUERY");
      vm.$store.commit("otherModule/TOGGLE_MAP_MODE", false);
    }
    next();
  }
})

const domain = process.env.NODE_ENV === "development" ?
  process.env.VUE_APP_BACKEND_DEV_DOMAIN :
  process.env.VUE_APP_BACKEND_DOMAIN;
Vue.domain = domain;

// 套件的刪不掉，刪除 cookie 補丁
Vue.prototype.delete_cookie = 
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
