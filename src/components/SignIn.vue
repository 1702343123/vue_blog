<template>
	<div class="signin">
		<h1>用户登录</h1>
		<div class="input_phone">
			<!-- <span class="t">手机:</span> -->
			<div class="e">
				<input type="text" v-model="userDTO.phoneNumber"  placeholder="请输入手机号" />
			</div>
		</div>
		<div class="input_pass" style="padding-top: 20px;">
			<!-- <span class="t">密码:</span> -->
			<div class="e">
				<input type="password" v-model="userDTO.password"  placeholder="请输入密码" />
			</div>
		</div>
		<div v-if="!alertshow" class="alertShow"></div>
		<div v-if="alertshow" class="alertShow">*&nbsp;{{tishi}}&nbsp;*</div>
		<div class="btn">
			<el-button type="primary" @click="signIn(userDTO)">登&nbsp;&nbsp;录</el-button>
			<el-link style="color: #C7C7C7;margin-left: 30px;padding-top: 20px;cursor: pointer;" href="/signUp">没有账号？现在注册</el-link>
		</div>

	</div>
</template>

<script>
	import {Message} from 'element-ui';
	export default {
		name:'SignIn',
		data(){
			return{
				alertshow:false,
				tishi:'123',
				userDTO:{
					phoneNumber:'',
					password:''
				}
			};
		},
		methods:{
			signIn:function(userDTO){
				var _this=this;
				console.log(userDTO.phoneNumber);
				this.$http({
					method:'POST',
					url:this.apiServer+'api/user/signIn',
					data:{
						'phoneNumber':userDTO.phoneNumber,
						'password':userDTO.password
					},
					header:{
						'content-type':'application/json'
					}
				}).then(function(res){
					if(res.data.code==0){
						console.log(res.data.data);
						var user={
							userID:res.data.data.userID,
							userName:res.data.data.userName,
							phoneNumber:res.data.data.phoneNumber,
							password:res.data.data.password,
							headUrl:res.data.data.headUrl,
							role:res.data.data.role,
							login:true,
						};
						var s=JSON.stringify(user);
						localStorage.setItem('login_key',s);
						if(user.role==1){
							Message({
								message:'登录成功，欢迎进入个人博客！',
								type:'success'
							});
							_this.$router.push('/home');
						}else{
							Message({
								message:'登录成功，欢迎进入管理员界面！',
								type:'success'
							});
							_this.$router.push('/admin');
						}
					}else{
						_this.alertshow=true
						_this.tishi=res.data.msg
					}
				})
			},
		}
	}
</script>

<style scoped>
	.signin{
		bottom: 30%;
		right: 37%;
		width: 400px;
		height: 350px;
		background:rgba(0, 0, 0, 0.5) none repeat scroll 0 0 !important;/*实现FF背景透明，文字不透明*/
		filter:Alpha(opacity=50);
		background:#000000;/*实现IE背景透明 */
		/* border: 4px ; */
		border-radius: 10px;
		position: absolute;
	}
	h1{
		margin:0 0 30px;
		padding:0;
		color: #fff;
		text-align:center;
		/*文字居中*/
		padding-top: 40px;
		font-family: "楷体";
	}
	.input_phone,.input_pass,.tishi{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.t{
		color: #FFFFFF;
		font-size: 20px;
	}
	.e input{
		height: 35px;
		border:none;
		border-bottom: 2px solid #fff;
		border-radius:5px;
		background: transparent;
		color: #FFFFFF;
		width: 220px;
	}
	.btn{
		/* width: 370px; */
		padding-top: 25px;
		display: flex;
		justify-content: center;
		/* align-items: center; */
	}
	.alertShow{
		color: red;
		font-size: 15px;
		padding-top: 15px;
		width: 60%;
		padding-left: 20%;
		height: 16px;
	}
	
</style>
