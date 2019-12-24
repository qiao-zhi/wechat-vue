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
			wxdata.jsApiList = ['onMenuShareTimeline'];

			Vue.wechat.config(wxdata);
			alert("config success");
		},
		async wxShare(obj) {
			var titleValue = "测试标题";
			var linkValue = "http://ynpxwl.cn/api/login.html";
			var imgUrl = "http://ynpxwl.cn/api/static/image/0.png";
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
		}
	};
</script>