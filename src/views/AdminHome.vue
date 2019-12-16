<template>
	<div class="home" style="height:100%;">
		<view-box ref="viewBox" body-padding-top="45px" body-padding-bottom="60px">

			<x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" :right-options="{showMore: true}" @on-click-more="showMenus = true">缴费系统后台管理</x-header>

			<router-view/>

			<tabbar slot="bottom">
				<tabbar-item link="/admin/kindergarten">
					<img slot="icon" src="../assets/icon_nav_button.png">
					<span slot="label">幼儿园列表</span>
				</tabbar-item>
				<tabbar-item link="/admin/pays">
					<img slot="icon" src="../assets/icon_nav_msg.png">
					<span slot="label">缴费明细</span>
				</tabbar-item>
				<tabbar-item link="/admin/settings">
					<img slot="icon" src="../assets/icon_nav_article.png">
					<span slot="label">后台设置</span>
				</tabbar-item>
				<tabbar-item selected link="/admin/user">
					<img slot="icon" src="@/assets/icon_nav_cell.png">
					<span slot="label">我</span>
				</tabbar-item>
			</tabbar>
		</view-box>
	</div>
</template>

<script>
	export default {
		name: 'adminHome',
	};
</script>