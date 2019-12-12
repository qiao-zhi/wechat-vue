import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'mint-ui/lib/style.css'
import { Button } from 'mint-ui';
import { Field } from 'mint-ui';
import { Header } from 'mint-ui';
import { Navbar, TabItem, Tabbar } from 'mint-ui';
import { Radio } from 'mint-ui';
import { Cell } from 'mint-ui';

Vue.component(Cell.name, Cell);
Vue.component(Tabbar.name, Tabbar);
Vue.component(Radio.name, Radio);
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
Vue.component(Header.name, Header);
Vue.component(Field.name, Field);
Vue.component(Button.name, Button);
Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app');