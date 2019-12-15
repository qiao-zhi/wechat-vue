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
				path: 'kindergarten',
				name: 'kindergarten',
				component: () =>
					import( /* webpackChunkName: "about" */ '../views/admin/Kindergarten.vue')
			},
			{
				path: 'pays',
				name: 'pays',
				component: () =>
					import( /* webpackChunkName: "about" */ '../views/admin/Pays.vue')
			},
			{
				path: 'settings',
				name: 'settings',
				component: () =>
					import( /* webpackChunkName: "about" */ '../views/admin/Settings.vue')
			},
			{
				path: 'user',
				name: 'user',
				component: () =>
					import( /* webpackChunkName: "about" */ '../views/User.vue')
			}
		]
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
				import( /* webpackChunkName: "about" */ '../views/User.vue')
		}, {
			path: 'pays',
			name: 'pays',
			component: () =>
				import( /* webpackChunkName: "about" */ '../views/plain/Pays.vue')
		}, {
			path: 'pay',
			name: 'pay',
			component: () =>
				import( /* webpackChunkName: "about" */ '../views/plain/Pay.vue')
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