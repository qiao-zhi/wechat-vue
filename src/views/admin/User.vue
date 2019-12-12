<template>
	<div class="user">
		管理员。欢迎您: {{getLoginUsername()}}
	</div>
</template>

<script>
	import store from '@/store';

	export default {
		name: 'User',
		store,
		methods: {
			getLoginUsername() {
				var username = localStorage.getItem("username");
				var fullname = localStorage.getItem("fullname");
				return fullname;
			},
		},
	};
</script>