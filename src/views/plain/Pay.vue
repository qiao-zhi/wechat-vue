<template>
	<div class="pay">
		<group title="如缴费错误可致电<a href='tel:18008726392'>18008726392</a>专员处理相关事宜" label-align="left" label-width="80px" key="reg">
			<x-input required title="幼儿园" readonly placeholder="请到个人中心设置所属幼儿园" v-model="kindergartenName"></x-input>
			<x-input required title="版本" readonly placeholder="选择幼儿园自动输入" v-model="version"></x-input>
			<x-input required title="服务商" readonly placeholder="选择幼儿园自动输入" v-model="server"></x-input>
			<x-input required title="缴费金额" readonly placeholder="选择幼儿园自动输入" v-model="payAmount"></x-input>
			<selector title="学期" placeholder="请选择学期" v-model="semester" :options="semesterList"> </selector>
			<selector title="年级" placeholder="请选择年级" v-model="grade" :options="gradeList"></selector>
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
	import Constants from '@/Constants.vue';

	export default {
		name: 'pay',
		data() {
			return {
				semesterList: ['上学期', '下学期'],
				gradeList: ['小托班', '小班', '中班', '大班', '幼小衔接班'],

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
				if(!Constants.isNotBlank(this.kindergartenId, "幼儿园") || !Constants.isNotBlank(this.semester, "学期") || !Constants.isNotBlank(this.grade, "年级") ||
					!Constants.isNotBlank(this.classNum, "班级") || !Constants.isNotBlank(this.parentPhone, "家长电话") || !Constants.isNotBlank(this.childrenName, "学生姓名")) {
					return;
				}

				var response = await axios.post('/pay/unifiedOrder.html', {
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
					// 统一下订单
					Constants.wxSPay(response.data);
				}
			}
		}

	};
</script>