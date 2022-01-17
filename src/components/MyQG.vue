<template>
	<div class="newpassword" style="height: 600px;">
		<div class="title">
			<span style="font-size: 20px;">修改密码：</span>
		</div>
		<div class="old_p">
			<span class="t">输入原密码：</span>
			<div class="e">
				<el-input type="password" v-model="password" placeholder="请输入原密码" show-password />
			</div>
		</div>
		<div class="old_p">
			<span class="t">输入新密码：</span>
			<div class="e" style="display: flex;">
				<el-input type="password" v-model="password2" placeholder="请输入新密码" show-password />
			</div>
			<span class="tishi">*&nbsp;密码不能少于6位</span>
		</div>
		<div class="new_p">
			<span class="t">确认新密码：</span>
			<div class="e">
				<el-input type="password" v-model="password3" placeholder="请再次输入新密码" show-password />
			</div>
		</div>
		<div style="margin-left: 40px;">
			<button class="btn" @click="upDatePassword()">确认修改</button>
		</div>
	</div>
	
</template>
<script>
	import { Message } from 'element-ui';
	export default {
	  name: 'myGQ',
		data(){
			return{
				userInfo: JSON.parse(localStorage.getItem('login_key')),
				// user:{},
				password:'',
				password2:'',
				password3:''
			};
		},
		mounted: function() {
			this.getUserMsg();
		},
		methods:{
			getUserMsg: function() {
				var _this = this;
				console.log('getUserInfo:userId(' + _this.userInfo.userID + ')')
				_this.$http({
					methods: 'GET',
					url:_this.apiServer+'api/user/userDetail'+_this.userInfo.userID,
					header:{
						'content-type':'application/json'
					},
// 					params: {
// 						id: _this.loginUser.userID
// 					}
				}).then(function(res) {
					if (res.data.code == 0) {
						_this.userInfo = res.data.data;
					} else {
						alert('数据加载失败！');
					}
				})
			},
			upDatePassword:function(){
				var _this=this;
				console.log(_this.userInfo.userID);
				console.log(_this.password2);
				if(_this.password==_this.userInfo.password){
					if(_this.password2==_this.password3){
						var _this = this;
						console.log(_this.password2);
						console.log('update:userId(' + _this.userInfo.userID + ')');
						_this.$http({
							method: 'POST',
							url: this.apiServer+'api/user/updatePassword',
							params: {
								userID: _this.userInfo.userID,
								password:_this.password2
							},
							header: {
								'content-type': 'application/json'
							}
						}).then(function(res) {
							if (res.data.code == 0) {
								_this.$alert('修改成功，请重新登录。','修改成功',{
									confirmButtonText:'确定',
									callback:action=>{
										_this.$router.push('/sign')
									}
								});
							} else {
								Message({
									message: res.data.msg,
									type: 'error',
									showClose: true
								})
							}
						});
					}else{
						Message({
							message:'两次新密码不一致，请重新输入',
							type:'warning',
							showClose:true
						})
					}
				}else{
					Message({
						message:'密码错误请重新输入',
						type:'error',
						showClose:true
					});
				}
			}
		}
	}
</script>

<style scoped>
	.title {
		height: 70px;
		line-height: 70px;
		border-bottom: 1px solid rgb(92, 92, 91);
		margin-bottom: 30px;
	}
	.btn{
		height: 45px;
		width: 100px;
		line-height: 45px;
		border-radius: 5px;
		background-color: rgb(84,92,100);
		color: #FFFFFF;
		border: none;
		cursor: pointer;
		font-size: 17px;
	}
	.newpassword{
		margin-top: 20px;
		margin-left: 20px;
		margin-right: 20px;
	}
	.old_p{
		display: flex;
		margin-bottom: 20px;
		margin-left: 40px;
	}
	.new_p{
		display: flex;
		margin-left: 40px;
		margin-bottom: 40px;
	}
	.tishi{
		line-height: 40px;
		color: rgb(109,109,109);
		margin-left: 10px;
		font-size: 12px;
	}
	.t{
		line-height: 40px;
	}
</style>
