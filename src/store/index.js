import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: ''
  },
  mutations: {
    setLoginUsername(state, username) {
      state.username = username
    },
  },
  actions: {
    setLoginUsernameFun(context, username) {
      context.commit("setLoginUsername", username);
    },
  },
  modules: {
  },
});
