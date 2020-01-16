<template>
	<div class="payDetail">
		<group title="缴费明细">
			<group title="幼儿园信息">
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
				<cell title="家长姓名">{{parentName}}</cell>
				<cell title="家长电话">{{parentPhone}}</cell>
				<cell title="缴费日期">{{payDate}}</cell>
				<cell title="缴费金额">{{payAmount}}</cell>
				<cell v-if="remark1 !== ''" title="备注">{{remark1}}</cell>
			</group>

			<group title="订单信息">
				<cell title="订单号">{{orderId}}</cell>
				<cell title="订单状态">{{orderStatus}}</cell>
			</group>
		</group>
	</div>
</template>
<script>
	import store from '@/store';
	import axios from 'axios';
	import Constants from '@/Constants.vue';

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
				payAmount: '',

				// 备注
				remark1: '',

				orderId: '',
				orderStatus: ''
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
				this.orderId = data.order_id;
				this.orderStatus = data.order_status;

				if(data.remark1) {
					this.remark1 = data.remark1;
				}

				// 修改分享至朋友圈的信息
				const basePath = Constants.getBasePath();
				const imgUrl = basePath + "/image/hdImg_68f8bcf949dde094c0f7a6d20e9b87f115773694318.jpg";
				const link = basePath + "/static/index.html";
				const title = "我在中国电信智慧平安校园考勤缴费系统成功缴费"
				Constants.wxShare({
					imgUrl,
					link,
					title
				});
			}
		}
	}
</script>