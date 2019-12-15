<template>
	<div class="plainHome" style="height:100%;">
		<view-box ref="viewBox" body-padding-top="45px" body-padding-bottom="60px">
			<x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" :right-options="{showMore: true}" @on-click-more="showMenus = true">幼儿园缴费系统</x-header>

			<router-view class="router-view"></router-view>

			<tabbar slot="bottom">
				<tabbar-item link="/plain/pays">
					<img slot="icon" src="../assets/icon_nav_msg.png">
					<span slot="label">缴费明细</span>
				</tabbar-item>
				<tabbar-item selected link="/plain/pay">
					<img slot="icon" src="@/assets/icon_nav_cell.png">
					<span slot="label">缴费</span>
				</tabbar-item>
				<tabbar-item selected link="/plain/user">
					<img slot="icon" src="@/assets/icon_nav_cell.png">
					<span slot="label">我</span>
				</tabbar-item>
			</tabbar>
		</view-box>
	</div>
</template>

<script>
	export default {
		name: 'plainHome',
	};
</script>

<style>
	.router-view {
		width: 100%;
		top: 46px;
	}
</style>