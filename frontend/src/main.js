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
import { faChevronRight, faChevronDown, faEdit } from '@fortawesome/pro-regular-svg-icons'
import { faPlus, faTimes } from '@fortawesome/pro-light-svg-icons'
library.add(faChevronRight);
library.add(faChevronDown);
library.add(faEdit);
library.add(faPlus);
library.add(faTimes);

// Import pages/components
import App from "./App";
import HomePage from '@/pages/HomePage';
import AppPage from '@/pages/AppPage';
import LoginPage from "./pages/LoginPage";
import TokenPage from "./pages/TokenPage";
import ServiceApp from '@/pages/AppPage/ServiceApp';


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
    { path: '/login/:token', component: TokenPage },
    { path: '/service', component: ServiceApp }
  ],
  mode: 'history'
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
