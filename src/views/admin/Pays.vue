<template>
	<div>
		<search placeholder="关键字" position="absolute" @on-change="loadMore" auto-scroll-to-top top="46px" v-model="keywords"></search>

		<group title="人工服务电话<a href='tel:18008726392'>18008726392</a>" label-align="left" label-width="80px" key="prompt">
		</group>

		<scroller :bounce=false ref="scrollerBottom" @on-scroll="onScroll" @on-scroll-bottom="onScrollBottom" height="-117px;" use-pullup :pullup-config="pullupDefaultConfig">
			<div style="padding: 10px 0">
				<group title="缴费列表">
					<div v-for="(item, index) in list" :key="index" id="showDetailModelDiv" @click="detailPay(item.id)">
						<cell is-link :key="index + 'cell'" :title="item.kindergartenName">
							{{item.childrenName}}
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
				pageSize: 6,
				keywords: '',

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

				this.$router.push('/admin/payDetail');
			},
			onScrollBottom() {
				if(this.last) {
					this.$vux.toast.text("加载已经全部完成");
				} else if(this.onFetching) {
					this.$vux.toast.text("正在加载中");
				} else {
					this.pageSize += 6;
					this.onFetching = true;
					this.loadMore();
				}
			},
			async loadMore() {
				var url = "/pay/pageJSON2.html";

				var response = await axios.post(url, {
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					keywords: this.keywords
				});

				var responseData = response.data;

				// 调用这个重置数据，不然会出问题
				this.$refs.scrollerBottom.reset()

				this.onFetching = false;
				this.last = responseData.isLastPage;
				this.list = responseData.list;

				if(this.last) {
					this.$refs.scrollerBottom.disablePullup();
				}
			}
		}
	}
</script>