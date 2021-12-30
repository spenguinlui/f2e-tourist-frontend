import Vue from 'vue';
import App from '@/App.vue';

import Router from 'vue-router';
import { routes } from '@/route';

import Vuex from 'vuex';
import { storeObject } from '@/store/index';

import 'leaflet/dist/leaflet.css';


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

router.beforeEach((to, _, next) => {
  if (to.name === "scenicspots" || to.name === "restaurants" || to.name === "hotels") {
    vm.$store.commit("otherModule/TOGGLE_MAP_MODE", false);
  } else if (to.name === "detail") {
    vm.$store.commit("CLEAR_DATA_DETAIL");
  }
  next();
})
