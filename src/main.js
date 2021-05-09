import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueSpinners from "vue-spinners";

// createApp.use(VueSpinners);


// new Vue({
//     router,
//     store,
//     render: h => h(App)
// }).mount("#app");

createApp(App).use(store).use(router).use(VueSpinners).mount("#app");
