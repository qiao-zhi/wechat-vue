<script>
	import axios from "@/axios";
	import Vue from 'vue';

	export default {
		name: 'Constants',
		// 项目的根路径(加api的会被代理请求，用于处理ajax请求)
		projectBaseAddress: '/api',
		// 微信授权后台地址，这里手动加api是用window.location.href跳转
		weixinAuthAddress: '/api/weixin/auth/login.html',
		async wxConfig() {
			function getUrl() {
				var url = window.location.href;
				var locationurl = url.split('#')[0];

				return locationurl;
			}

			// wx.config的参数
			var wxdata = {
				"url": getUrl()
			};

			//微信分享（向后台请求数据）
			var data = await axios.post("/weixin/auth/getJsapiSigner.html", wxdata);

			var wxdata = data.data;
			// 向后端返回的签名信息添加前端处理的东西
			wxdata.debug = true;
			// 所有要调用的 API 都要加到这个列表中
			'onMenuShareTimeline' //分享到朋友圈
			wxdata.jsApiList = ['onMenuShareTimeline', 'chooseWXPay'];

			Vue.wechat.config(wxdata);
			alert("config success");
		},
		async wxShare(obj) {
			// 先config
			await this.wxConfig();

			var titleValue = "测试标题";
			var linkValue = "http://ynpxwl.cn/api/login.html";
			var imgUrlValue = "http://ynpxwl.cn/api/static/image/0.png";
			if(obj) {
				if(obj.title) {
					titleValue = obj.title;
				}
				if(obj.link) {
					linkValue = obj.link;
				}
				if(obj.imgUrl) {
					imgUrlValue = obj.imgUrl;
				}
			}

			alert(1);
			Vue.wechat.ready(function() {
				alert(2);
				Vue.wechat.onMenuShareTimeline({
					title: titleValue, // 分享标题
					link: linkValue, // 分享链接
					imgUrl: imgUrlValue, // 分享图标
					success: function() {
						// 用户确认分享后执行的回调函数
						alert('用户已分享');
					},
					cancel: function(res) {
						alert('用户已取消');
					},
					fail: function(res) {
						alert(JSON.stringify(res));
					}
				});
				alert(3);
			})
		},
		async wxSPay() {
			// 先config
			await this.wxConfig();

			// 从后台获取订单信息然后支付

			var responseData = await axios.post("/weixin/pay/unifiedOrder.html");
			var data = responseData.data;
			alert(JSON.stringify(data));

			Vue.wechat.chooseWXPay({
				timestamp: data.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
				nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
				package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
				signType: data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
				paySign: data.paySign, // 支付签名
				success: function(res) {
					alert("支付成功")
				}
			});
		}
	};
</script>