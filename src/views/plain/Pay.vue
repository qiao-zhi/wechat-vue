<template>
	<div class="pay">
		<group title="如缴费错误可致电<a href='tel:18008426392'>18008426392</a>专员处理相关事宜" label-align="left" label-width="80px" key="reg">
			<x-input required title="幼儿园" readonly placeholder="请到个人中心设置所属幼儿园" v-model="kindergartenName"></x-input>
			<x-input required title="版本" readonly placeholder="选择幼儿园自动输入" v-model="version"></x-input>
			<x-input required title="服务商" readonly placeholder="选择幼儿园自动输入" v-model="server"></x-input>
			<x-input required title="缴费金额" readonly placeholder="选择幼儿园自动输入" v-model="payAmount"></x-input>
			<selector title="学期" placeholder="请选择学期" v-model="semester" :options="semesterList" @on-change="onChange"></selector>
			<x-input required title="年级" v-model="grade"></x-input>
			<x-input required title="班级" v-model="classNum"></x-input>
			<x-input required title="家长姓名" v-model="parentName"></x-input>
			<x-input required title="家长电话" v-model="parentPhone"></x-input>
			<x-input required title="学生姓名" v-model="childrenName"></x-input>
		</group>
		<x-button type="primary" @click.native="doPay" key="doPay">缴费</x-button>
		<br/>
	</div>
</template>

<script>
	import axios from "@/axios";
	import { AlertModule } from 'vux';
	import store from '@/store';

	export default {
		store,
		name: 'pay',
		data() {
			return {
				semesterList: ['上学期', '下学期'],

				kindergartenId: '',
				kindergartenName: '',
				version: '',
				server: '',
				semester: '',
				grade: '',
				classNum: '',
				parentName: '',
				parentPhone: '',
				childrenName: '',
				payAmount: ''
			};
		},
		mounted: async function() {
			var userRes = await axios.post("/user/detailLoginUser.html");
			var userinfo = userRes.data;
			this.parentName = userinfo.fullname;
			this.parentPhone = userinfo.phone;
			this.childrenName = userinfo.childrenname;

			if(userinfo.remark1) {
				var response = await axios.post('/kindergarten/detailByName.html', {
					name: userinfo.remark1
				});

				this.version = response.data.version;
				this.server = response.data.server;
				this.payAmount = response.data.amount;
				this.kindergartenName = response.data.name;
				this.kindergartenId = response.data.id;
			}
		},
		methods: {
			async doPay() {
				if(this.kindergartenId == '' || this.kindergartenName == '' || this.version == '' || this.server == '' || this.semester == '' || this.grade == '' || this.classNum == '' || this.parentName == '' || this.parentPhone == '' || this.childrenName == '' || this.payAmount == '') {
					AlertModule.show({
						title: "提示信息",
						content: "请检查必填字段"
					});
					return;
				}

				var response = await axios.post('/pay/doAddJSON.html', {
					kindergartenId: this.kindergartenId,
					kindergartenName: this.kindergartenName,
					version: this.version,
					server: this.server,
					semester: this.semester,
					grade: this.grade,
					classNum: this.classNum,
					parentName: this.parentName,
					parentPhone: this.parentPhone,
					childrenName: this.childrenName,
					payAmount: this.payAmount
				});

				if(response.success) {
					this.$vux.toast.text("缴费成功,您可以点击右上角分享至朋友圈");

					this.kindergartenId = "";
					this.kindergartenName = "";

					this.detailPay(response.data.id);
				}
			},
			async detailPay(id) {
				store.dispatch("setPayIdFun", id);

				this.$router.push('/plain/payDetail');
			},
		}

	};
</script>