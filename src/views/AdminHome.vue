<template>
	<div class="home">
		<x-header :right-options="{showMore: true}" @on-click-more="showMenus = true">缴费系统后台管理</x-header>

		<tabbar>
			<tabbar-item link="/admin/kindergarten">
				<img slot="icon">
				<span slot="label">幼儿园列表</span>
			</tabbar-item>
			<tabbar-item show-dot link="/admin/pays">
				<img slot="icon">
				<span slot="label">缴费明细</span>
			</tabbar-item>
			<tabbar-item link="/admin/settings">
				<img slot="icon">
				<span slot="label">后台设置</span>
			</tabbar-item>
			<tabbar-item link="/admin/user">
				<img slot="icon" selected>
				<span slot="label">我</span>
			</tabbar-item>
		</tabbar>

		<router-view/>
	</div>
</template>

<script>
	export default {
		name: 'adminHome',
	};
</script>