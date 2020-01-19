<template>
	<div>
		<search placeholder="关键字" position="absolute" @on-change="loadMore" auto-scroll-to-top top="46px" v-model="keywords"></search>

		<scroller :bounce=false ref="scrollerBottom" @on-scroll-bottom="onScrollBottom" height="-117px;" use-pullup :pullup-config="pullupDefaultConfig">

			<div style="padding: 10px 0">
				<group title="幼儿园列表">
					<div v-for="(item, index) in list" :key="index" id="showDetailModelDiv" @click="changeShowDetailModel(item.id)">
						<cell is-link :key="index + 'cell'">
							<span slot="title" :key="index + 'span'">{{index + 1 }}</span> {{item.name}}
						</cell>
					</div>
				</group>
			</div>
		</scroller>

		<div>
			<popup v-model="showDetailModel" :value=true is-transparent>
				<div style="background-color:#fff;margin:0 auto;border-radius:5px;padding-top:5px;">
					<group>
						<cell title="名称">{{detailName}}</cell>
						<cell title="版本">{{detailServer}}</cell>
						<cell title="服务商">{{detailVersion}}</cell>
						<cell title="地址">{{detailAddress}}</cell>
						<cell title="收费金额">{{detailAmount}}</cell>
					</group>
				</div>
			</popup>
		</div>
	</div>
</template>
<script>
	import axios from 'axios'
	import { TransferDomDirective as TransferDom } from 'vux'

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

				showDetailModel: false,
				detailName: '',
				detailServer: '',
				detailVersion: '',
				detailAddress: '',
				detailAmount: ''
			}
		},
		methods: {
			async changeShowDetailModel(id) {
				var response = await axios.post('/kindergarten/detail/' + id);

				this.detailName = response.data.name;
				this.detailServer = response.data.server;
				this.detailVersion = response.data.version;
				this.detailAddress = response.data.address;
				this.detailAmount = response.data.amount;

				console.log("detailAddress    " + this.detailAddress)

				this.showDetailModel = !this.showDetailModel;
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
				var url = "/kindergarten/pageJSON.html";

				var response = await axios.post(url, {
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					keywords: this.keywords,
				});

				// 调用这个重置数据，不然会出问题
				this.$refs.scrollerBottom.reset()

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