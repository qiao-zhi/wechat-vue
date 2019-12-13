import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import { XButton } from 'vux'
import { XInput } from 'vux'
import { Group } from 'vux'
import { XHeader } from 'vux'
import { Tabbar, TabbarItem } from 'vux'

Vue.component('tabbar', Tabbar)
Vue.component('tabbar-item', TabbarItem)
Vue.component('x-header', XHeader)
Vue.component('group', Group)
Vue.component('x-input', XInput)
Vue.component('x-button', XButton)

// ToastPlugin提示插件
import { ToastPlugin } from 'vux'
Vue.use(ToastPlugin, {
	position: 'middle'
})

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app');