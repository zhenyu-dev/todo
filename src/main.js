import Vue from "vue";
import App from "./App.vue";
import apolloProvider from "./vue-apollo";
import "@/scss/app.scss";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  apolloProvider
}).$mount("#app");
