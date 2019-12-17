<template>
	<div class="payDetail">
		<group title="幼儿园">
			<cell title="名称">{{name}}</cell>
			<cell title="服务商">{{server}}</cell>
			<cell title="版本">{{version}}</cell>
			<cell title="应收金额">{{amount}}</cell>
		</group>

		<group title="学生信息">
			<cell title="学期">{{semester}}</cell>
			<cell title="年级">{{grade}}</cell>
			<cell title="班级">{{classNum}}</cell>
			<cell title="学生姓名">{{childrenName}}</cell>
			<cell title="父母姓名">{{parentName}}</cell>
			<cell title="父母电话">{{parentPhone}}</cell>
			<cell title="缴费日期">{{payDate}}</cell>
			<cell title="缴费金额">{{payAmount}}</cell>
		</group>
	</div>
</template>
<script>
	import store from '@/store';
	import axios from 'axios';

	export default {
		store,
		data() {
			return {
				name: '',
				server: '',
				version: '',
				amount: '',

				semester: '',
				grade: '',
				classNum: '',
				childrenName: '',
				parentName: '',
				parentPhone: '',
				payDate: '',
				payAmount: ''
			};
		},
		mounted() {
			this.detailPay();
		},
		methods: {
			async detailPay() {
				var payId = store.state.payId;
				var response = await axios.post('/pay/detailCus/' + payId);

				var data = response.data;
				this.name = data.kindergarten_name;
				this.server = data.server;
				this.version = data.version;
				this.amount = data.amount;

				this.semester = data.semester;
				this.grade = data.grade;
				this.classNum = data.class_num;
				this.childrenName = data.children_name;
				this.parentName = data.parent_name;
				this.parentPhone = data.parent_phone;
				this.payDate = data.pay_date;
				this.payAmount = data.pay_amount;
			}
		}
	}
</script>