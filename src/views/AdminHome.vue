<template>
	<div class="home" style="height:100%; ">
		<view-box ref="viewBox" body-padding-top="45px" body-padding-bottom="60px">
			<x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" :right-options="{showMore: true}" @on-click-more="showMenus = true">中国电信平安校园考勤卡自助缴费系统</x-header>

			<router-view/>

			<tabbar slot="bottom">
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
			<actionsheet v-model="showMenus" @on-click-menu="clickFXPYQ" :menus="FXPYQMenus" :close-on-clicking-mask="false" show-cancel @on-click-mask="console('on click mask')"></actionsheet>
		</div>
	</div>
</template>

<script>
	import Constants from '@/Constants.vue';

	export default {
		name: 'adminHome',
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