import Vue from 'vue';
import App from './App.vue';

import Router from 'vue-router';
import { routes } from './route';

import Vuex from 'vuex';
import { storeObject } from './store';

import 'leaflet/dist/leaflet.css';


Vue.use(Router);
const router = new Router({
  linkExactActiveClass: 'active',
  linkActiveClass: 'active',
  mode: 'history',
  routes
});

Vue.use(Vuex);
const store = new Vuex.Store(storeObject);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
