import Vue from "vue";
import Vuex from "vuex";
import imagerepo from "./modules/imagerepo";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    imagerepo
  }
});
