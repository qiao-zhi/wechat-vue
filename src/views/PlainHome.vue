<template>
	<div class="plainHome" style="height:100%;">
		<view-box ref="viewBox" body-padding-top="45px" body-padding-bottom="60px">
			<x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" :right-options="{showMore: true}" @on-click-more="showMenus = true">幼儿园缴费系统</x-header>

			<router-view class="router-view"></router-view>

			<tabbar slot="bottom">
				<tabbar-item link="/plain/pays" selected>
					<span slot="icon"><i class="icono-list"></i></span>
					<span slot="label">缴费明细</span>
				</tabbar-item>
				<tabbar-item link="/plain/pay">
					<span slot="icon"><i class="icono-filter"></i></span>
					<span slot="label">缴费</span>
				</tabbar-item>
				<tabbar-item link="/plain/user">
					<span slot="icon"><i class="icono-user"></i></span>
					<span slot="label">我</span>
				</tabbar-item>
			</tabbar>
		</view-box>

		<div class="moreSheet">
			<actionsheet v-model="showMenus" @on-click-menu="clickFXPYQ" :menus="FXPYQMenus" :close-on-clicking-mask="false" show-cancel @on-click-mask="console('on click mask')"></actionsheet>
		</div>
	</div>
</template>

<script>
	import Constants from '@/Constants.vue';
	import axios from "@/axios";

	export default {
		name: 'plainHome',
		data() {
			return {
				showMenus: false,
				FXPYQMenus: {
					menu1: "分享到朋友圈"
				}
			}
		},
		methods: {
			clickFXPYQ(menuKey, menuItem) {
				if("menu1" == menuKey) {
					Constants.wxShare();
				}
			}
		}
	};
</script>

<style>
	.router-view {
		width: 100%;
		top: 46px;
	}
</style>