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
    },
  async deleteImageData({ commit }, payload) {
      var config = {
        method: 'delete',
        url: 'http://localhost:3000/products/' + payload._id,
        headers: { 
          'Content-Type': 'application/json'
        }
      };
      try {
          await axios(config);
          commit("UPDATE_IMAGE_DATA_BLOBS", payload);
      } catch (err) {
          console.log(err);
      }
    },
    async editImageData({ commit }, payload) {
      const data = JSON.stringify(payload.updateValues);
      var config = {
        method: 'patch',
        url: 'http://localhost:3000/products/' + payload._id,
        headers: { 
            'Content-Type': 'application/json',
          },
        data: data
      };
      try {
         await axios(config);
          commit("UPDATE_IMAGE_DATA", payload);
      } catch (err) {
          console.log(err);
      }
  },
};

const mutations = {
  STORE_STATES: (state, payload) => {
    state.imageData = payload.data.products;
  },

  STORE_IMAGE_BLOBS: (state, payload) => {
    state.imageBlobs = payload;
    // console.log("payload is ", state.imageBlobs);
  },
  UPDATE_IMAGE_DATA_BLOBS: (state, payload) => {
      state.imageData = state.imageData.filter(el => el._id != payload._id);
      state.imageBlobs = state.imageBlobs.filter(el => el.index != payload.index);
  },
    UPDATE_IMAGE_DATA: (state, payload) => {
        if (payload.updateValues.length > 0) {
            for (const el of payload.updateValues) {
                if (el.propName === "price") {
                    state.imageData[payload.index].price = el.value;
                } else {
                    state.imageData[payload.index].name = el.value;
                }
            }
        }
        else if (payload.updateValues[0].propName === "price") {
            state.imageData[payload.index].price = payload.updateValues[0].value;
        }
        else {
             state.imageData[payload.index].name = payload.updateValues[0].value;
        }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
