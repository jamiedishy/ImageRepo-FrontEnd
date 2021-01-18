// import axios from "axios";


// const state = {
//     imageName: null,
//     imagePrice: null,
//     imageReadStream: null
// //   userRecommendations: null,
// //   userPreferences: null, // expect an object with various preferences (ie location, activity, etc.) to be displayed on profile page
// //   userProfileImage: null,
// //   userName: null,
// //   userEmail: null,
// //   userPassword: null,
// //   userId: null,
// //   userToken: null,
// //   userExpiry: null,
// //   userBirthday: null,
// //   userInterest: null,
// //   userLocation: null,
// //   userRecommendationsCount: 0,
// //   userSwipedList: [],
// //   userMatches: null
// };

// const getters = {};

// // var domain;

// // if (process.env.NODE_ENV === 'development') {
// //   domain = 'http://localhost:8081';
// // } else {
// //   domain = 'http://api.wheypal.com';
// // }

// const actions = {
//     async uploadImage({ commit }, body) {
//         console.log("Uploading image");
//         let FormData = require('form-data');
//         let fs = require('fs');
//         let data = new FormData();
//         data.append('price', body.price);
//         data.append('name', body.name);
//         // data.append('productImage', fs.createReadStream('/C:/Users/Jamie Dishy/Desktop/ApplicationInvestments.PNG'));
//         data.append('productImage', fs.createReadStream(body.imageReadStream));

//         var config = {
//           method: 'post',
//           url: 'localhost:3000/products',
//           headers: { 
//             ...data.getHeaders()
//           },
//           data : data
//         };

//         axios(config)
//         .then(function (response) {
//           console.log(JSON.stringify(response.data));
//         })
//         .catch(function (error) {
//           console.log(error);
//         });
//     }


// //   async createUser({ commit }, body) {
// //     console.log("Creating user");
// //     const url = domain + "/user";
// //     const response = await axios.post(url, body);
// //     const payload = response.data;
// //     payload["body"] = body;
// //     commit("CREATE_USER", payload);
// //   },
// //   async setRecommendations({ commit }, payload) {
// //     commit("SET_RECOMMENDATIONS", payload);
// //   },
// //   // updateRecommendationCount({ commit }) {
// //   //   commit("UPDATE_RECOMMENDATION_COUNT");
// //   // },
// //   removeRecommendation({ commit }, payload) { // new recs without the disliked profile
// //     commit("REMOVE_RECOMMENDATION", payload)
// //   },
// //   async loginUser({ commit }, body) {
// //     console.log("Login user");
// //     const url = domain + "/login";
// //     const response = await axios.post(url, body);
// //     const payload = response.data;
// //     payload["body"] = body;
// //     commit("LOGIN_USER", payload);
// //   },
// //   async logOffUser({ commit }) {
// //     console.log("Sign out user");
// //     commit("LOGOFF_USER");
// //   },
// //   async updateLogin({ commit }, body) {
// //     const data = { "password": `${body.userPassword}`, "userID": body.userID, "email": `${body.userEmail}` };
// //     const url = domain + "/login";
// //     const config = {
// //       method: 'put',
// //       headers: { 
// //         'Authorization': `Bearer ${body.userToken}`
// //       },
// //       data : data
// //     };
// //     await axios(url, config); // boolean
// //     // const response = await axios(url, config); // boolean
// //     // const payload = response.data;
// //     // payload["body"] = body;
// //     commit("UPDATE_LOGIN", body);
// //   },
// //   async getMatches({ commit }, userToken) {
// //     const url = domain + "/match";
// //     const config = {
// //       method: 'get',
// //       headers: { 
// //         'Authorization': `Bearer ${userToken}`
// //       }
// //     };
// //     const response = await axios(url, config); 
// //     const payload = response.data;
// //     commit("GET_MATCHES", payload);
// //   },
// //   async deleteMatch({ commit }, body) {
// //     const url = domain + "/match/" + body.userID;
// //     const config = {
// //       method: 'delete',
// //       headers: { 
// //         'Authorization': `Bearer ${body.userToken}`
// //       }
// //     };
// //     const response = await axios(url, config); // boolean
// //     const payload = {
// //       res: response,
// //       userIdToDelete: body.userID
// //     }
// //     commit("DELETE_MATCHES", payload);
// //   }
// };

// const mutations = {
// //   CREATE_USER: (state, payload) => {
// //     state.userId = payload.id;
// //     state.userEmail = payload.email;
// //     state.userToken = payload.token;
// //     state.userExpiry = payload.expiry;
// //     state.userName = payload.body.name;
// //     state.userEmail = payload.body.email;
// //     state.userPassword = payload.body.password;
// //     state.userInterest = payload.body.interest;
// //     state.userLocation = payload.body.location;
// //     state.userBirthday = payload.body.birthday;
// //   },
// //   SET_RECOMMENDATIONS: (state, payload) => {
// //     state.userRecommendations = JSON.parse(payload);
// //     state.userRecommendationsCount = state.userRecommendations.length;
// //     if (state.userRecommendationsCount === undefined) {
// //       state.userRecommendations = [];
// //       state.userRecommendationsCount = 0;
// //     }
// //   },
// //   // UPDATE_RECOMMENDATION_COUNT: (state) => {
// //   //   state.userRecommendationsCount = state.userRecommendationsCount - 1;
// //   // },
// //   REMOVE_RECOMMENDATION: (state, payload) => { // payload is the index
// //     state.userRecommendations = state.userRecommendations.filter(el => el.userID !== payload);
// //     state.userRecommendationsCount = state.userRecommendationsCount - 1;
// //   },
// //   LOGIN_USER: (state, payload) => {
// //     state.userToken = payload.token;
// //     state.userExpiry = payload.expiry;
// //     state.userId = payload.id;
// //     state.userEmail = payload.body.email;
// //     state.userPassword = payload.body.password;
// //     state.userLocation = payload.location;
// //     state.userBirthday = payload.birthday;
// //     state.userInterest = payload.interest;
// //     state.userName = payload.name;
// //   },
// //   LOGOFF_USER: state => {
// //     Object.keys(state).forEach(el => {
// //       if (el === "userSwipedList") {
// //         state[el] = []
// //       } else {
// //         state[el] = null;
// //       }
// //     })
// //   },
// //   UPDATE_LOGIN: (state, payload) => {
// //     state.userPassword = payload.password;
// //     state.userEmail = payload.email
// //   },
// //   GET_MATCHES: (state, payload) => {
// //     state.userMatches = payload;
// //   },
// //   DELETE_MATCHES: (state, payload) => {
// //     if (payload.res) {
// //       state.userMatches = state.userMatches.filter(el => el.userID !== payload.userIdToDelete);
// //     } 
// //   }
// };

// export default {
//   state,
//   getters,
//   actions,
//   mutations
// };