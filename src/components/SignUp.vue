<template>
	<div class="signUp">
		<div class="title" style="padding-left: 30px;padding-top: 10px;">
			<h1 style="color: #FFFFFF;font-family: 楷体;">注册:</h1>
		</div>
		<div class="one" style="width: 100%;padding-top: 20px;" v-show="!vshow">
			<div style="text-align: center;">
				<div style="">
					<input style="height: 35px;width: 50%;" type="text" v-model="phoneNumber" placeholder="请输入手机号"/>
				</div>
				<div style="padding-top: 20px;">
					<input style="height: 35px;width: 30%;" type="text" v-model="code" placeholder="请输入验证码"/>
					<button class="btn_code" v-show="bshow" @click="getVerifyCode()">获取验证码</button>
					<button calss="btn_code2" v-show="!bshow" style="width: 20%;height: 35px;background: rgb(54,158,255);border:none;color: #FFFFFF;border-radius: 5px;">{{count}}&nbsp;秒</button>
				</div>
			</div>
			<div v-if="!alertshow"  class="tishi"></div>
			<div v-if="alertshow" class="tishi">
				<span>*&nbsp;{{tishi}}&nbsp;*</span>
			</div>
			<div style="padding-top: 35px;text-align: center;">
				<button class="btn_next" @click="next()">下一步</button>
			</div>
		</div>
		<div class="two" v-show="vshow" style="width: 100%;">
			<div style="font-size: 17px;color: #FFFFFF;">
				<div style="padding-bottom: 10px;width: 70%;padding-left: 17%;">
					<span>昵&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</span>
					<input style="width: 60%;height: 35px;" type="text" v-model="user.userName" placeholder="请输入昵称"/>
				</div>
				<div style="padding-bottom: 10px;width: 70%;padding-left: 17%;">
					<span>手&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机：{{phoneNumber}}</span>
				</div>
				<div style="padding-bottom: 10px;width: 70%;padding-left: 17%;">
					<span>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码：</span>
					<input style="width: 60%;height: 35px;" type="password" v-model="user.password" placeholder="请输入密码"/>
				</div>
				<div style="width: 70%;padding-left: 17%;">
					<span>确认密码：</span>
					<input style="width: 60%;height: 35px;" type="password" v-model="user.password2" placeholder="请再次输入密码"/>
				</div>
			</div>
			<div style="width: 70%;padding-left: 15%;padding-top: 20px;">
				<button class="btn_zhuce" @click="add(user)">注册</button>
			</div>
		</div>
	</div>
</template>

<script>
	import {Message} from 'element-ui';
	export default {
		name:'SignUp',
		data(){
			return{
				vshow:false,
				alertshow:false,
				bshow:true,
				phoneNumber:'',
				code:'',
				timer:null,
				count:'',
				user:{
					headUrl:'http://save-pan.oss-cn-shanghai.aliyuncs.com/img/9b45813f-b17e-47ca-ac52-81dc2e3d24b8.jpg',
					userName:'',
					phoneNumber:'',
					password:'',
					password2:'',
				},
				tishi:'',
			};
			
		},
		methods:{
			getVerifyCode:function(){
				var _this=this;
				console.log(_this.phoneNumber);
				this.$http({
					method:'POST',
					url:_this.apiServer+'api/user/sendCode',
					data:{
						'phoneNumber':_this.phoneNumber,
					},
					header:{
						'content-type':'application/json'
					}
				}).then(function(res){
					if(res.data.code==0){
						_this.$alert('验证码已发送，请注意查看。','验证码发送',{
							confirmButtonText:'确定',
							callback:action=>{}
						});
						_this.alertshow=false
						const TIME_COUNT=60;
						if(!_this.timer){
							_this.count=TIME_COUNT;
							_this.bshow=false;
							_this.timer=setInterval(()=>{
								if(_this.count>0&&_this.count<=TIME_COUNT){
									_this.count--;
								}else{
									_this.bshow=true;
									clearInterval(_this.timer);
									_this.timer=null;
								}
							},1000)
						};
					}else{
						_this.alertshow=true
						_this.tishi=res.data.msg
					}
				})
			},
			next: function() {
				var _this=this;
				_this.$http({
					method:'POST',
					url:_this.apiServer+'api/user/matchVerify',
					data:{
						'code':_this.code,
						'phoneNumber':_this.phoneNumber
					},
					header:{
						'content-type':'application/json'
					}
				}).then(function(res){
					if(res.data.code==0){
						_this.vshow=true;
					}else{
						_this.alertshow=true;
						_this.tishi=res.data.msg;
					}
				})
			},
			add:function(user){
				if(this.user.userName.length===0){
					Message({
						message:'姓名不能为空！',
						type:'wraning'
					})
				}else{
					if(this.user.password===this.user.password2){
						var _this=this;
						_this.user.phoneNumber=_this.phoneNumber;
						console.log(_this.user.userName);
						console.log(_this.user.phoneNumber);
						console.log(_this.user.password);
						console.log(_this.user.headUrl);
						_this.$http({
							method:'POST',
							url:_this.apiServer+'api/user/signUp',
							params:{
								headUrl:_this.user.headUrl,
								userName:_this.user.userName,
								phoneNumber:_this.user.phoneNumber,
								password:_this.user.password
							},
							header:{
								'content-type':'application/json'
							}
						}).then(function(res){
							if(res.data.code==0){
								_this.$alert('已注册成功，请先登录。','注册成功',{
									confirmButtonText:'确定',
									callback:action=>{
										_this.$router.push('/sign')
									}
								});
							}else{
								Message({
									message:'注册失败！！'+res.data.msg,
									type:'error',
									showClose:true
								})
							}
						})
					}else{
						Message({
							message:'两次密码不一致，请重新输入。',
							type:'wraning'
						})
					}
				}
			}
		},
		
	}
</script>

<style scoped>
	.signUp{
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
		/* text-align: center; */
	}
	.signUp input{
		border:none;
		border-bottom: 2px solid #fff;
		border-radius:5px;
		background: transparent;
		color: #FFFFFF;
	}
	.btn_code{
		width: 20%;
		height: 35px;
		background: rgb(54,158,255);
		border:none;
		color: #FFFFFF;
		border-radius: 5px;
		cursor: pointer;
	}
	.btn_code2{
		width: 20%;
		height: 35px;
		background: rgb(54,158,255);
		border:none;
		color: #FFFFFF;
		border-radius: 5px;
	}
	.btn_next{
		width: 50%;
		height: 40px;
		background: rgb(54,158,255);
		border:none;
		color: #FFFFFF;
		border-radius: 5px;
		cursor: pointer;
	}
	.btn_zhuce{
		width: 100%;
		height: 35px;
		font-size: 17px;
		background: rgb(54,158,255);
		border:none;
		color: #FFFFFF;
		border-radius: 5px;
		cursor: pointer;
	}
	.tishi{
		padding-top: 10px;
		color: red;
		font-size: 13px;
		width: 240px;
		height: 16px;
		padding-left: 95px;
	}
</style>
