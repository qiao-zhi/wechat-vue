<template>
	<div class="login">
		<form v-if="!isReg">
			<group title="登录" label-align="left" label-width="80px" key="login">
				<x-input required text-align="left" title="用户名" placeholder="Input username" v-model="username"></x-input>
				<x-input required text-align="left" title="密    码" placeholder="Input password" type="password" v-model="password"></x-input>
			</group>
			<x-button action-type="button" type="primary" @click.native="login()" key="loginBtn">登录</x-button>
			<!--<br/>
			<x-button action-type="button" type="default" @click.native="reg()" key="regBtn" plain>注册</x-button>-->
			<br/>
			<x-button action-type="button" type="primary" @click.native="wxLogin()" key="wxLogin">微信登录</x-button>
		</form>
		<div v-else>
			<group title="注册" label-align="left" label-width="80px" key="reg">
				<x-input required title="用户名" placeholder="Input username" v-model="username"></x-input>
				<x-input required title="用户姓名" placeholder="Input fullname" v-model="fullname"></x-input>
				<x-input required title="密    码" placeholder="Input password" type="password" v-model="password"></x-input>
				<x-input required title="电    话" placeholder="Input phone" v-model="phone"></x-input>
				<group title="性别">
					<radio title="性    别" :options="sexOptions" v-model="sex"></radio>
				</group>
			</group>
			<x-button type="primary" @click.native="addUser()" key="doReg">注册</x-button>
			<br/>
			<x-button type="default" @click.native="cancel()" key="cancel" plain>取消</x-button>
		</div>

	</div>
</template>

<script>
	import { AlertModule } from 'vux'
	import axios from "@/axios";
	// 引入常量模块
	import Constants from '@/Constants.vue';

	var login = {
		name: 'login',
		data() {
			return {
				isReg: false,
				username: '',
				fullname: '',
				password: '',
				phone: '',
				sex: '',
				sexOptions: ['男', '女']
			};
		},
		methods: {
			async login() {
				this.isReg = false;
				if(this.username == "" || this.password == "") {
					MessageBox.alert("账号密码必须输入");
					return;
				}

				// 异步登录
				var response = await axios.post('/doLoginJSON.html', {
					username: this.username,
					password: this.password
				});

				if(response.success) {
					// 显示文字
					this.$vux.toast.text('登录成功');

					// 将用户存入localStorage
					localStorage.setItem("userId", response.data.id);

					var roles = response.data.roles;
					// 跳转路由
					if(roles && roles.indexOf("系统管理员") > -1) {
						this.$router.replace("/admin");
					} else {
						this.$router.replace("/plain");
					}
				}
			},
			reg() {
				this.username = '';
				this.password = '';
				this.isReg = true;
			},
			async addUser() {
				if(this.username == '' || this.password == '' || this.fullname == '' || this.phone == '' || this.sex == '') {
					AlertModule.show({
						title: "提示信息",
						content: "请检查必填字段"
					});
					return;
				}

				// 异步注册
				var response = await axios.post('/user/doAddUserJSON.html', {
					username: this.username,
					fullname: this.fullname,
					password: this.password,
					phone: this.phone,
					sex: this.sex,
				});

				if(response.success) {
					this.isReg = false;

					this.$vux.toast.text("注册成功");
				}
			},
			cancel() {
				this.isReg = false;
			},
			wxLogin() {
				window.location.href = Constants.weixinAuthAddress;
			}
		}
	}
	export default login;
</script>