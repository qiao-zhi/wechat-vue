<template>
	<div class="user">
		<group>
			<span style="text-align: right;">
				<img :src="wechatphoto" style="width: 60px;" />&nbsp;&nbsp;&nbsp;{{wechatnickname}}
			</span>
			<div id="fullnameDiv" @click="changeShowFullname">
				<cell title="姓名" is-link>{{fullname}}</cell>
			</div>
			<popup-radio title="性别" :options="sexList" v-model="sex" @on-hide="hideSex"></popup-radio>
			<div id="addressDiv" @click="changeShowAddress">
				<cell title="地址" is-link>{{wechataddress}}</cell>
			</div>
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

		<group title="人工服务电话<a href='tel:18008726392'>18008726392</a>" label-align="left" label-width="80px" key="prompt">
			<br />
		</group>

		<div v-transfer-dom>
			<confirm v-model="showPhone" ref="showPhone" show-input title="电话" :input-attrs="{type: 'number'}" @on-confirm="onConfirmPhone" @on-show="onShowPhone">
			</confirm>
			<confirm v-model="showFullname" ref="showFullname" show-input title="姓名" @on-confirm="onConfirmFullname" @on-show="onShowFullname">
			</confirm>
			<confirm v-model="showChildrenname" ref="showChildrenname" show-input title="孩子姓名" @on-confirm="onConfirmChildrenname" @on-show="onShowChildrenname">
			</confirm>
			<confirm v-model="showAddress" ref="showAddress" show-input title="地址" @on-confirm="onConfirmAddress" @on-show="onShowAddress">
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
				sexList: ['男', '女'],

				wechataddress: '',
				phone: '',
				childrenname: '',
				coupon: '',

				remark1: '', //幼儿园名称
				list: [],

				showFullname: false,
				showPhone: false,
				showChildrenname: false,
				showAddress: false
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
				if(!value) {
					this.$vux.toast.text('值不能为空');
					return;
				}

				const matchReg = /^[1][3,4,5,7,8][0-9]{9}$/;
				if(!value.match(matchReg)) {
					this.$vux.toast.text('电话不合法');
					return;
				}

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
				if(!value) {
					this.$vux.toast.text('值不能为空');
					return;
				}

				await axios.post('/user/updateLoginUser.html', {
					childrenname: value
				});

				this.childrenname = value;

				this.$vux.toast.text('修改成功');
				this.$refs.showChildrenname.setInputValue('');

			},

			// 改变幼儿园名称
			async onChangeKindergarten(value) {
				// 将_this指向当前vm对象
				const _this = this;
				var confirmContent = '您确定要选择 ' + value + ' 吗？您只有一次修改的机会!';
				this.$vux.confirm.show({
					title: '',
					content: confirmContent,
					onConfirm() {
						axios.post('/user/updateLoginUser.html', {
							remark1: value
						});

						_this.remark1 = value;
						_this.$vux.toast.text('修改成功');
					},
					onCancel() {
						_this.remark1 = '';
					}
				})
			},

			// 修改用户姓名
			changeShowFullname() {
				this.showFullname = !this.showFullname;
			},
			onShowFullname() {
				this.$refs.showFullname.setInputValue(this.fullname);
			},
			async onConfirmFullname(value) {
				if(!value) {
					this.$vux.toast.text('值不能为空');
					return;
				}

				await axios.post('/user/updateLoginUser.html', {
					fullname: value
				});

				this.fullname = value;

				this.$vux.toast.text('修改成功');
				this.$refs.showFullname.setInputValue('');
			},

			// 修改用户地址
			changeShowAddress() {
				this.showAddress = !this.showAddress;
			},
			onShowAddress() {
				this.$refs.showAddress.setInputValue(this.wechataddress);
			},
			async onConfirmAddress(value) {
				if(!value) {
					this.$vux.toast.text('值不能为空');
					return;
				}

				await axios.post('/user/updateLoginUser.html', {
					wechataddress: value
				});

				this.wechataddress = value;

				this.$vux.toast.text('修改成功');
				this.$refs.showAddress.setInputValue('');
			},

			// 隐藏修改性别窗口时候异步请求修改性别
			hideSex() {
				axios.post('/user/updateLoginUser.html', {
					sex: this.sex
				});
			}
		}
	};
</script>