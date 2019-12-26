<template>
	<div class="user">
		<group title="第一次登陆优惠券金额">
			<div id="couponDiv" @click="changeShowUpdateAmount" key="couponKeyDiv">
				<cell title="金额" is-link key="couponKey">{{coupon}}</cell>
			</div>
		</group>

		<div>
			<confirm v-model="showUpdateAmount" ref="couponRef" show-input title="输入金额" :input-attrs="{type: 'number'}" @on-confirm="onConfirm" @on-show="onShow">
			</confirm>
		</div>
	</div>
</template>

<script>
	import axios from "@/axios";

	export default {
		name: 'settings',
		directives: {
			//TransferDom
		},
		data() {
			return {
				coupon: '',

				showUpdateAmount: false
			}
		},
		methods: {
			changeShowUpdateAmount() {
				this.showUpdateAmount = !this.showUpdateAmount;
			},
			onShow() {
				this.$refs.couponRef.setInputValue(this.coupon);
			},
			async onConfirm(value) {
				var response = await axios.post('/settings/setProperty.html?key=coupon&value=' + value);
				this.$vux.toast.text('修改成功');

				this.coupon = value;
			}
		},
		mounted: async function() {
			var userId = localStorage.getItem("userId");
			var response = await axios.post("/settings/getProperty.html?key=coupon");

			this.coupon = response.data;
		}
	};
</script>