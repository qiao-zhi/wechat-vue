import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';

Vue.use(VueRouter);

const routes = [{
		path: '/',
		name: 'login',
		component: Login,
	},
	{
		path: '/admin',
		name: 'admin',
		component: () =>
			import( /* webpackChunkName: "about" */ '../views/AdminHome.vue'),
		redirect: '/admin/user',
		children: [{
			path: 'user',
			name: 'user',
			component: () =>
				import( /* webpackChunkName: "about" */ '../views/admin/User.vue')
		}]
	},
	{
		path: '/plain',
		name: 'plain',
		component: () =>
			import( /* webpackChunkName: "about" */ '../views/PlainHome.vue'),
		redirect: '/plain/user',
		children: [{
			path: 'user',
			name: 'user',
			component: () =>
				import( /* webpackChunkName: "about" */ '../views/plain/User.vue')
		}]
	}
];

const router = new VueRouter({
	mode: 'hash',
	base: process.env.BASE_URL,
	linkActiveClass: 'active',
	routes,
});

export default router;