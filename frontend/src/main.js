// Import core files
import Vue from 'vue'
import VueRouter from 'vue-router'
import config from '../config';

import * as Sentry from '@sentry/browser';
import { Vue as VueIntegration } from '@sentry/integrations';

import BootstrapVue from 'bootstrap-vue'

// Import CSS files
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Import and set up FontAwesome PRO
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/pro-solid-svg-icons'
import { far } from '@fortawesome/pro-regular-svg-icons'
import { fal } from '@fortawesome/pro-light-svg-icons'
import { fad } from '@fortawesome/pro-duotone-svg-icons'
library.add(fas);
library.add(far);
library.add(fal);
library.add(fad);

// Import pages/components
import App from "./App";
import HomePage from '@/pages/HomePage';
import AppPage from '@/pages/AppPage';
import LoginPage from "./pages/LoginPage";
import TokenPage from "./pages/TokenPage";


// Here we go... setting up the main stuff now!
Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false;

Sentry.init({
  dsn: config.sentry,
  integrations: [new VueIntegration({Vue, attachProps: true})],
});

const router = new VueRouter({
  routes: [
    { path: '/', component: HomePage},
    { path: '/app', component: AppPage },
    { path: '/login', component: LoginPage },
    { path: '/login/:token', component: TokenPage }
  ],
  mode: 'history'
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
