<template>
	<div class="pay">
		<div>
			<group title="缴费单" label-align="left" label-width="80px" key="reg">
				<selector title="幼儿园" placeholder="请选择幼儿园" v-model="kindergartenId" :options="list" @on-change="onChange"></selector>
				<x-input required title="版本" readonly placeholder="选择幼儿园自动输入" v-model="version"></x-input>
				<x-input required title="服务商" readonly placeholder="选择幼儿园自动输入" v-model="server"></x-input>
				<x-input required title="学期" v-model="semester"></x-input>
				<x-input required title="年级" v-model="grade"></x-input>
				<x-input required title="班级" v-model="classNum"></x-input>
				<x-input required title="父母姓名" v-model="parentName"></x-input>
				<x-input required title="父母电话" v-model="parentPhone"></x-input>
				<x-input required title="学生姓名" v-model="childrenName"></x-input>
				<x-input required title="缴费金额" readonly placeholder="选择幼儿园自动输入" v-model="payAmount"></x-input>
			</group>
			<x-button type="primary" @click.native="doPay" key="doPay">缴费</x-button>
			<br/>
		</div>
	</div>
</template>

<script>
	import axios from "@/axios";
	import { AlertModule } from 'vux'

	export default {
		name: 'pay',
		data() {
			return {
				list: [],

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
			var response = await axios.post("/kindergarten/listNamesAndIds.html");
			this.list = response.data;
		},
		methods: {
			async onChange(value) {
				if(value) {
					var response = await axios.post('/kindergarten/detail/' + value);

					this.version = response.data.version;
					this.server = response.data.server;
					this.payAmount = response.data.amount;
					this.kindergartenName = response.data.name;
				} else {
					this.version = "";
					this.server = "";
					this.payAmount = "";
				}
			},
			async doPay() {
				if(this.kindergartenId == '' || this.kindergartenName == '' || this.version == '' || this.server == '' || this.semester == '' || this.grade == '' || this.classNum == '' || this.parentName == '' || this.parentPhone == '' || this.childrenName == '' || this.payAmount == '') {
					AlertModule.show({
						title: "提示信息",
						content: "请检查必填字段"
					});
					return;
				}

				// 异步注册
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
					this.$vux.toast.text("缴费成功");

					this.kindergartenId = "";
					this.kindergartenName = "";
				}
			}
		}
	};
</script>