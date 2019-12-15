<template>
	<div class="user">
		<group title="第一次登陆优惠券金额">
			<div id="FXPYQDiv" @click="changeShowUpdateAmount">
				<cell title="金额" is-link>{{amount}}</cell>
			</div>
		</group>

		<div v-transfer-dom>
			<confirm v-model="showUpdateAmount" ref="amount" show-input title="输入金额" :input-attrs="{type: 'number'}" @on-confirm="onConfirm" @on-show="onShow">
			</confirm>
		</div>
	</div>
</template>

<script>
	import axios from "@/axios";
	import { TransferDomDirective as TransferDom } from 'vux'

	export default {
		name: 'settings',
		directives: {
			TransferDom
		},
		data() {
			return {
				amount: '',

				showUpdateAmount: false
			}
		},
		methods: {
			changeShowUpdateAmount() {
				this.showUpdateAmount = !this.showUpdateAmount;
			},
			onShow() {
				this.$refs.amount.setInputValue(this.amount);
			},
			async onConfirm(value) {
				var response = await axios.post('/settings/setProperty.html?key=amount&value=' + value);
				this.$vux.toast.text('修改成功');

				this.$refs.amount.setInputValue('');
				this.amount = value;
			}
		},
		mounted: async function() {
			var userId = localStorage.getItem("userId");
			var response = await axios.post("/settings/getProperty.html?key=amount");

			this.amount = response.data;
		}
	};
</script>