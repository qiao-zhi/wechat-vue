<script>
	export default {
		name: 'Constants',
		// 项目的根路径(加api的会被代理请求，用于处理ajax请求)
		projectBaseAddress: '/api',
		// 微信授权后台地址，这里手动加api是用window.location.href跳转
		weixinAuthAddress: '/weixin/auth/login.html',
	};
</script>