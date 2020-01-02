<template>
	<div class="user">
		<group>
			<span style="text-align: right;">
				<img :src="wechatphoto" style="width: 60px;" />&nbsp;&nbsp;&nbsp;{{wechatnickname}}
			</span>
			<div id="fullnameDiv" @click="changeShowFullname">
				<cell title="姓名" is-link>{{fullname}}</cell>
			</div>
			<cell title="性别">{{sex}}</cell>
			<cell title="地址">{{wechataddress}}</cell>
			<div id="phoneDiv" @click="changeShowPhone">
				<cell title="电话" is-link>{{phone}}</cell>
			</div>
			<div id="childrennameDiv" @click="changeShowChildrenname">
				<cell title="学生姓名" is-link>{{childrenname}}</cell>
			</div>
			<div id="remark1Div" v-if="remark1 != ''">
				<cell title="所属幼儿园">{{remark1}}</cell>
			</div>
			<div v-else>
				<selector title="幼儿园" placeholder="请选择幼儿园" v-model="remark1" :options="list" @on-change="onChangeKindergarten"></selector>
			</div>
			<cell title="优惠金额">{{coupon}}</cell>
		</group>

		<div v-transfer-dom>
			<confirm v-model="showPhone" ref="showPhone" show-input title="电话" @on-confirm="onConfirmPhone" @on-show="onShowPhone">
			</confirm>
			<confirm v-model="showFullname" ref="showFullname" show-input title="姓名" @on-confirm="onConfirmFullname" @on-show="onShowFullname">
			</confirm>
			<confirm v-model="showChildrenname" ref="showChildrenname" show-input title="孩子姓名" @on-confirm="onConfirmChildrenname" @on-show="onShowChildrenname">
			</confirm>
		</div>

	</div>
</template>

<script>
	import axios from "@/axios";
	import Constants from '@/Constants.vue';

	export default {
		name: 'user',
		data() {
			return {
				wechatphoto: '',

				fullname: '',
				wechatnickname: '',
				sex: '',
				wechataddress: '',
				phone: '',
				childrenname: '',
				coupon: '',

				remark1: '', //幼儿园名称
				list: [],

				showFullname: false,
				showPhone: false,
				showChildrenname: false
			}
		},
		mounted: async function() {
			var response = await axios.post("/user/detailLoginUser.html");

			this.wechatphoto = response.data.wechatphoto;

			this.fullname = response.data.fullname;
			this.wechatnickname = response.data.wechatnickname;
			this.sex = response.data.sex;
			this.wechataddress = response.data.wechataddress;
			this.phone = response.data.phone;
			this.childrenname = response.data.childrenname;
			this.coupon = response.data.coupon;

			// 如果用户有幼儿园名称就显示，没有显示下拉列表进行选择
			if(response.data.remark1) {
				this.remark1 = response.data.remark1;
			} else {
				var response2 = await axios.post("/kindergarten/listNamesAndIds.html");
				this.list = response2.data;
			}
		},
		methods: {
			// 修改电话
			changeShowPhone() {
				this.showPhone = !this.showPhone;
			},
			onShowPhone() {
				this.$refs.showPhone.setInputValue(this.phone);
			},
			async onConfirmPhone(value) {
				await axios.post('/user/updateLoginUser.html', {
					phone: value
				});

				this.phone = value;

				this.$vux.toast.text('修改成功');
				this.$refs.showPhone.setInputValue('');

			},

			// 修改孩子姓名
			changeShowChildrenname() {
				this.showChildrenname = !this.showChildrenname;
			},
			onShowChildrenname() {
				this.$refs.showChildrenname.setInputValue(this.childrenname);
			},
			async onConfirmChildrenname(value) {
				await axios.post('/user/updateLoginUser.html', {
					childrenname: value
				});

				this.childrenname = value;

				this.$vux.toast.text('修改成功');
				this.$refs.showChildrenname.setInputValue('');

			},

			// 改变幼儿园名称
			async onChangeKindergarten(value) {
				await axios.post('/user/updateLoginUser.html', {
					remark1: value
				});

				this.remark1 = value;

				this.$vux.toast.text('修改成功');
			},

			// 修改用户姓名
			changeShowFullname() {
				this.showFullname = !this.showFullname;
			},
			onShowFullname() {
				this.$refs.showFullname.setInputValue(this.fullname);
			},
			async onConfirmFullname(value) {
				await axios.post('/user/updateLoginUser.html', {
					fullname: value
				});

				this.fullname = value;

				this.$vux.toast.text('修改成功');
				this.$refs.showFullname.setInputValue('');

			},
		}
	};
</script>