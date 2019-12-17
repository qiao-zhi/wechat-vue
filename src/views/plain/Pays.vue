<template>
	<div>
		<scroller bounce="false" ref="scrollerBottom" @on-scroll="onScroll" @on-scroll-bottom="onScrollBottom" height="-117px;" use-pullup :pullup-config="pullupDefaultConfig">
			<div style="padding: 10px 0">
				<group title="缴费列表">
					<div v-for="(item, index) in list" :key="index" id="showDetailModelDiv" @click="detailPay(item.id)">
						<cell is-link>
							<span slot="title">{{item.kindergartenName }}</span> {{item.childrenName}}
						</cell>
					</div>
				</group>
			</div>
		</scroller>
	</div>
</template>
<script>
	import axios from 'axios'
	import { TransferDomDirective as TransferDom } from 'vux'
	import store from '@/store';

	const pullupDefaultConfig = {
		content: '上拉加载更多',
		pullUpHeight: 60,
		height: 40,
		autoRefresh: false,
		downContent: '释放后加载',
		upContent: '上拉加载更多',
		loadingContent: '加载中...',
		clsPrefix: 'xs-plugin-pullup-'
	}

	export default {
		store,
		mounted() {
			this.loadMore()
		},
		data() {
			return {
				list: [],

				// 页号一直是1，增加页大小
				pageNum: 1,
				pageSize: 0,

				//标记是否在取数据
				onFetching: false,
				// 标记是否是最后一页
				last: false,

				pullupDefaultConfig: pullupDefaultConfig,

				scrollTop: 0,
			}
		},
		methods: {
			onScroll() {
				this.scrollTop = pos.top
			},
			async detailPay(id) {
				store.dispatch("setPayIdFun", id);

				this.$router.push('/plain/payDetail');
			},
			onScrollBottom() {
				if(this.last) {
					this.$vux.toast.text("加载已经全部完成");
				} else if(this.onFetching) {
					this.$vux.toast.text("正在加载中");
				} else {
					this.onFetching = true;
					this.loadMore();
				}
			},
			async loadMore() {
				var url = "/pay/pageJSON.html";

				this.pageSize += 6;
				var response = await axios.post(url, {
					pageNum: this.pageNum,
					pageSize: this.pageSize
				});

				var responseData = response.data;

				this.onFetching = false;
				this.last = responseData.last;
				this.list = responseData.content;

				if(this.last) {
					this.$refs.scrollerBottom.disablePullup();
				}
			}
		}
	}
</script>