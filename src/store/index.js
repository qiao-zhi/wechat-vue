import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		payId: ''
	},
	mutations: {
		setPayId(state, payId) {
			state.payId = payId
		},
	},
	actions: {
		setPayIdFun(context, payId) {
			context.commit("setPayId", payId);
		},
	},
	modules: {},
});