// import axios from "axios";

const state = {
  imageData: "",
  imageBlobs: []
};

const getters = {};

// var domain;

// if (process.env.NODE_ENV === 'development') {
//   domain = 'http://localhost:8081';
// } else {
//   domain = 'http://api.wheypal.com';
// }

const actions = {
  async uploadImage({ commit }, payload) {
    commit("STORE_STATES", payload);
  }
};

const mutations = {
  STORE_STATES: (state, payload) => {
    state.imageData = payload.data;
    state.imageBlobs = payload.imageBlobs;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
