<template>
	<div class="user">
		<group title="基本信息">
			<span style="text-align: right;">
				<img :src="photo" style="width: 60px;" />&nbsp;&nbsp;&nbsp;{{fullname}}
			</span>
			<cell title="性别">{{sex}}</cell>
			<cell title="地址">{{remark1}}</cell>
			<cell title="角色">{{roles}}</cell>
			<cell title="分享朋友圈次数">{{FXPYQTimes}}</cell>
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
				remark1: '', // 时间
				photo: '',

				FXPYQTimes: 0
			}
		},
		mounted: async function() {
			var userId = localStorage.getItem("userId");
			var response = await axios.post("/user/detailLoginUser.html");

			this.fullname = response.data.fullname;
			this.roles = response.data.roles;
			this.sex = response.data.sex;
			this.remark1 = response.data.remark1;
			this.photo = response.data.photo;
		}
	};
</script>