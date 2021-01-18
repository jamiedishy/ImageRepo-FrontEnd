import axios from "axios";

const state = {
  imageData: [],
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
  async getImageData({ commit }) {
    try {
      const payload = await axios.get("http://localhost:3000/products/");
      commit("STORE_STATES", payload);
    } catch (err) {
      console.log(err);
    }
  },

  async storeImageBlobs({ commit }) {
    let payload = [];
    let index = 0;
    console.log("image data should be done", state.imageData);
    for (const el of state.imageData) {
      try {
        let config = {
          method: "get",
          url: el.request.url,
          responseType: "blob"
        };
        let temp = await axios(config);
        let reader = new FileReader();
        reader.readAsDataURL(temp.data);
        reader.onload = () => {
          payload[index] = reader.result;
          index++;
        };
      } catch (err) {
        console.log(err);
      }
    }
    commit("STORE_IMAGE_BLOBS", payload);
  }
};

const mutations = {
  STORE_STATES: (state, payload) => {
    state.imageData = payload.data.products;
  },

  STORE_IMAGE_BLOBS: (state, payload) => {
    state.imageBlobs = payload;
    console.log("payload is ", state.imageBlobs);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
