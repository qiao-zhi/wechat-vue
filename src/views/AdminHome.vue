<template>
	<div class="home" style="height:100%; ">
		<view-box ref="viewBox" body-padding-top="45px" body-padding-bottom="60px">
			<x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" :right-options="{showMore: true}" @on-click-more="showMenus = true">考勤卡缴费系统</x-header>

			<router-view/>

			<tabbar slot="bottom" v-transfer-dom>
				<tabbar-item link="/admin/kindergarten" selected>
					<span slot="icon"><i class="icono-file"></i></span>
					<span slot="label">幼儿园列表</span>
				</tabbar-item>
				<tabbar-item link="/admin/pays">
					<span slot="icon"><i class="icono-list"></i></span>
					<span slot="label">缴费明细</span>
				</tabbar-item>
				<tabbar-item link="/admin/settings">
					<span slot="icon"><i class="icono-gear"></i></span>
					<span slot="label">后台设置</span>
				</tabbar-item>
				<tabbar-item link="/admin/user">
					<span slot="icon"><i class="icono-user"></i></span>
					<span slot="label">我</span>
				</tabbar-item>
			</tabbar>
		</view-box>

		<div class="moreSheet">
			<actionsheet v-model="showMenus" @on-click-menu="clickMore" :menus="moreMenus" :close-on-clicking-mask="true"></actionsheet>
		</div>
	</div>
</template>

<script>
	import Constants from '@/Constants.vue';
	import axios from "@/axios";

	export default {
		name: 'adminHome',
		data() {
			return {
				showMenus: false,

				moreMenus: {
					menu1: "退出登录"
				}
			}
		},
		methods: {
			clickMore(menuKey, menuItem) {
				if("menu1" == menuKey) {
					this.logout();
				}
			},
			logout() {
				// 将_this指向当前vm对象
				const _this = this;
				this.$vux.confirm.show({
					title: '',
					content: '您确定要登出吗？',
					onConfirm() {
						axios.post("/logoutJson.html");
						_this.$router.replace("/");
					}
				})
			}
		}
	};
</script>