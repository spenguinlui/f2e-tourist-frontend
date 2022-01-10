import Vue from 'vue';
import App from '@/App.vue';

import Router from 'vue-router';
import { routes } from '@/route';

import Vuex from 'vuex';
import { storeObject } from '@/store/index';

import 'leaflet/dist/leaflet.css';

import VueCookie from 'vue-cookies';
Vue.use(VueCookie);

import { AJAX_S_checkSupplierLogin } from '@/modules/server-api'

Vue.use(Router);
const router = new Router({
  linkExactActiveClass: 'active',
  linkActiveClass: 'active',
  // mode: 'history',
  routes
});

Vue.use(Vuex);
const store = new Vuex.Store(storeObject);

Vue.config.productionTip = false;
Vue.prototype.window = window;

const vm = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

vm.$cookies.config('30d')

router.beforeEach((to, _, next) => {
  if (to.name === "scenicspots" || to.name === "restaurants" || to.name === "hotels") {
    vm.$store.commit("otherModule/TOGGLE_MAP_MODE", false);
  } else if (to.name === "detail") {
    vm.$store.commit("CLEAR_DATA_DETAIL");
  }

  if (to.meta.requiresAuth) {
    const supplierAuthToken = vm.$cookies.get('_s');
    const supplierParams = { auth_token: supplierAuthToken }
    AJAX_S_checkSupplierLogin(supplierParams)
    .then(res => {
      if (res.data.success) {
        next();
      }
    })
    .catch(() => {
      next({ name: 'supplier-login' })
    })
  }
  next();
})
