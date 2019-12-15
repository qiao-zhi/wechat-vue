<template>
	<div class="user">
		<group title="基本信息">
			<cell title="姓名">{{fullname}}</cell>
			<cell title="性别">{{sex}}</cell>
			<cell title="电话">{{phone}}</cell>
			<cell title="角色">{{roles}}</cell>
			<group title="分享朋友圈">
				<div id="FXPYQDiv" @click="changeDisplayFXPYQ()">
					<cell title="分享次数" is-link>{{FXPYQTimes}}</cell>
					<actionsheet v-model="displayFXPYQ" @on-click-menu="clickFXPYQ" :menus="FXPYQMenus" :close-on-clicking-mask="false" show-cancel @on-click-mask="console('on click mask')"></actionsheet>
				</div>

			</group>
		</group>
	</div>
</template>

<script>
	import axios from "@/axios";

	export default {
		name: 'user',
		data() {
			return {
				fullname: '',
				roles: '',
				sex: '',
				phone: '',

				FXPYQTimes: 0,
				displayFXPYQ: false,
				FXPYQMenus: {
					menu1: "分享到朋友圈",
					menu2: "分享给朋友"
				},
			}
		},
		methods: {
			changeDisplayFXPYQ() {
				this.displayFXPYQ = !this.displayFXPYQ;
			},
			clickFXPYQ(menuKey, menuItem) {
				console.log(menuKey, menuItem)
			}

		},
		mounted: async function() {
			var userId = localStorage.getItem("userId");
			var response = await axios.post('/user/detail/' + userId + ".html");

			this.fullname = response.data.fullname;
			this.roles = response.data.roles;
			this.sex = response.data.sex;
			this.phone = response.data.phone;
		}
	};
</script>