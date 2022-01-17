<template>
	<div>
		<div class="header">
			<div class="menu">
				<div class="left">
					个人博客系统
				</div>
				<div class="right">
					<li class="li1">
						<router-link to="/home" class="right_text">首页</router-link>
					</li>

					<li class="li1">
						<router-link to="/blog" class="right_text">聚合博客</router-link>
					</li>

					<li class="li1">
						<router-link to="/videoList" class="right_text">交流</router-link>
					</li>

					<li v-if="user!=null" class="li1">
						<router-link to="/newBlog" class="right_text">新建</router-link>
					</li>

					<li v-if="user!=null" class="li1">
						<router-link to="/userCenter" class="right_text">个人中心</router-link>
					</li>
				</div>
			</div>
			<div class="login" style="display: flex;" v-if="user!=null">
				<div class="avatar" style="line-height: 170px;" v-if="user.login">
					<img :src="userInfo.headUrl" style="height: 50px;width: 50px;border-radius: 50%;" />
				</div>
				<div v-if="user.login" style="margin-left: 10px;line-height: 5px;margin-top: 35px;">
					<a href="/userCenter">
						<!-- <el-tooltip content="个人中心" placement="bottom" effect="light"> -->
							<p style="color: rgb(67,74,80);font-size: 18px;cursor: pointer;">{{userInfo.userName}}</p>
						<!-- </el-tooltip> -->
					</a>
					<span style="color: rgb(109,109,109);cursor: pointer;" @click="logout()">退出</span>
				</div>
			</div>
			<div class="login" v-if="user==null">
				<div class="avatar" style="line-height: 170px;">
					<img src="../assets/default.png" style="height: 50px;width: 50px;border-radius: 50%;" />
				</div>
				<div style="margin-left: 10px;line-height: 5px;margin-top: 45px;">
					<a href="/sign">
						<p style="color: rgb(84,92,100);font-size: 16px;cursor: pointer;">点击登录</p>
					</a>
				</div>
			</div>
		</div>
		<div class="content">
			<router-view />
		</div>
		<div class="footer">
			
		</div>
	</div>
</template>

<script>
	import {
		Message
	} from 'element-ui';
	var loginRes, _self;
	export default {
		name: 'Index',
		data(){
			return{
				storageData:{},
				user:JSON.parse(localStorage.getItem('login_key')),//获取本地存储的user信息
				userInfo:{},
				vshow:false,
			};
		},
		mounted(){
			if(this.user!=null){
				this.vshow=true;
				this.getUserMsg();
			}
		},
		methods:{
			//退出登录，删除本地存储信息
			logout:function(){
				var _this=this;
				console.log('log out')
				localStorage.removeItem('login_key');
				_this.user=null;
				Message({
					message:'已退出当前账号。',
					type:'success'
				});
				_this.$router.push('/index');
			},
			//获取登录用户详细信息
			getUserMsg:function(){
				var _this=this;
				_this.$http({
					method:'GET',
					url:_this.apiServer+'api/user/userDetail',
					header:{
						'content-type':'application/json'
					},
					params:{
						user_er:_this.user.userID,
						user_ed:_this.user.userID
					}
				}).then(function(res){
					if(res.data.code==0){
						_this.userInfo=res.data.data;
						// console.log(_this.userInfo);
					}else{
						alert('用户信息加载失败！');
					}
				})
			}
		}
	}
</script>

<style scoped>
	a {
		text-decoration: none;
	}

	.header {
		width: 100%;
		height: 150px;
		background-color: #FFFFFF;
		display: flex;
	}

	.menu {
		display: flex;
		padding-top: 1%;
		width: 82%;
		margin-left: 7%;
	}

	.left {
		width: 60%;
		font-family:"楷体";
		font-size: 50px;
		padding-top: 25px;
	}

	.right {
		/* height: 124px; */
		width: 50%;
		padding-top: 20px;
		/* margin-left: 130px; */
		display: flex;
	}

	.img {
		height: 140px;
		vertical-align: middle;
		margin-right: 80px;
		margin-top: -4%;
	}

	.right_text {
		height: 100px;
		vertical-align: middle;
		line-height: 100px;
		text-decoration: none;
		color: #818996;
		padding: 2.6em 1.5em;
		font-size: 16px;
	}

	.right_text:hover {
		border-bottom: 2px solid rgb(67,74,80);
		color: rgb(67,74,80);
		font-weight: 600;
	}

	.router-link-active:hover {
		font-weight: 600;
		color: #FFFFFF;
	}

	.router-link-active {
		background-color: rgb(67,74,80);
		color: #FFFFFF;
	}

	.right_style {
		border-bottom: 2px solid #009e01;
		color: #009e01;
		font-weight: bold;
		background-color: #009e01;
		color: white;
	}

	.li1 {
		list-style: none;
		float: left;
		padding: 0;
		margin-top: 5px;
		height: 100px;
		width: 0 auto;
		background-color: #FFFFFF;
	}
	
	.login{
		display: flex;
		padding-top: 10px;
	}

	.content {
		padding-top: 10px;
		margin: 0 auto;
		width: 70%;
		padding-bottom: 5px;
	}

	.footer {
		width: 100%;
		height: 150px;
		background-color: rgb(45, 50, 55);
	}

	.top {
		display: flex;
	}

	.footer_left {
		border-right: 1px solid #C7C7C7;
		margin-top: 20px;
		width: 45%;
	}

	.top_img {
		height: 140px;
		vertical-align: middle;
		margin-top: -2%;
		margin-left: 120px;
	}

	.footer_right {
		display: flex;
	}

	.footer_phone {
		display: flex;
		margin-top: 45px;
		width: 245px;
		height: 76px;
		float: left;
	}

	.footer_img {
		width: 75px;
		height: 75px;
		margin-left: 31%;
		margin-top: 1%;
		float: left;
		vertical-align: middle;
	}

	.phone {
		color: white;
		vertical-align: middle;
		margin-left: 5px;
	}

	.end {
		width: 100%;
		text-align: center;
		color: white;
		font-size: 12px;
	}

	.end_text {
		text-align: center;
	}
</style>
