import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import { XButton } from 'vux'
import { XInput } from 'vux'
import { Group } from 'vux'
import { XHeader } from 'vux'
import { Tabbar, TabbarItem } from 'vux'
import { CellBox } from 'vux'
import { Cell } from 'vux'
import { Radio } from 'vux'
import { Actionsheet } from 'vux'
import { Confirm } from 'vux'
import { Scroller } from 'vux'
import { Popup } from 'vux'
import { ViewBox } from 'vux'
import { Selector } from 'vux'
import { Search } from 'vux'
import { ConfirmPlugin } from 'vux'

Vue.use(ConfirmPlugin)
Vue.component('search', Search)
Vue.component('selector', Selector)
Vue.component('view-box', ViewBox)
Vue.component('popup', Popup)
Vue.component('scroller', Scroller)
Vue.component('confirm', Confirm)
Vue.component('actionsheet', Actionsheet)
Vue.component('radio', Radio)
Vue.component('cell', Cell)
Vue.component('cell-box', CellBox)
Vue.component('tabbar', Tabbar)
Vue.component('tabbar-item', TabbarItem)
Vue.component('x-header', XHeader)
Vue.component('group', Group)
Vue.component('x-input', XInput)
Vue.component('x-button', XButton)

import { TransferDom } from 'vux'
Vue.directive('transfer-dom', TransferDom)

// 引入微信对接模块
import { WechatPlugin } from 'vux'
Vue.use(WechatPlugin)
console.log(Vue.wechat) // 可以直接访问 wx 对象,wx对象是微信jssdk的入口

// ToastPlugin提示插件
import { ToastPlugin } from 'vux'
Vue.use(ToastPlugin, {
	position: 'middle'
})

// 自己的图标样式可
import '@/assets/css/icon/icono.min.css'
import '@/assets/css/wechat-vue-all.css'

Vue.config.productionTip = false;

// 引入常量模块
import axios from "@/axios";
import Constants from '@/Constants.vue';

new Vue({
	router,
	store,
	render: h => h(App),
	mounted() {
		axios.post('/weixin/auth/getJsapiSigner.html', {
			url: "http://localhost:8080/"
		}).then(function(resData) {
			console.log(resData);
		});
	}
}).$mount('#app');