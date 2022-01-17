<template>
	<div class="body" style="display: flex;">
		<div class="left" style="width: 25%;background: #FFFFFF;margin-right: 20px;height: 300px;">
			<div class="list">
					<li class="list-title">
						<router-link to="/userCenter/myFollow" class="list_text">我的关注</router-link>
					</li>
					<li class="list-title">
						<router-link to="/userCenter/myCollect" class="list_text">我的收藏</router-link>
					</li>
					<li class="list-title">
						<router-link to="/userCenter/myBlog" class="list_text">我的博客</router-link>
					</li>
					<li class="list-title">
						<router-link to="/userCenter/myInfo" class="list_text">我的信息</router-link>
					</li>
					<li class="list-title">
						<router-link to="/userCenter/myQG" class="list_text">修改密码</router-link>
					</li>
					<div class="list-title">
						<span class="list_text" style="cursor: pointer;" @click="cancelUser()">注销账号</span>
					</div>
				</div>
		</div>
		<div class="right" style="width: 75%;background: #FFFFFF;height:0 auto;">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	import {Message} from 'element-ui';
	export default {
		name: 'UserCenter',
		data(){
			return{
				user:JSON.parse(localStorage.getItem('login_key')),//获取本地存储的user信息
			};
		},
		methods:{
			cancelUser:function(){
				var _this=this;
				_this.$confirm('你确认要注销你的账号吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					_this.$http({
						method:'GET',
						url:this.apiServer+'api/user/cancelUser',
						params:{
							userID:_this.user.userID
						},
						header:{
						'content-type': 'application/json'
						}
					}).then(function(res){
						if(res.data.code==0){
							localStorage.removeItem('login_key');
							_this.user=null;
							Message({
								message:'已注销当前账号。',
								type:'success'
							});
							_this.$router.push('/index');
						}else{
							alert('加载数据失败');
						}
					})
				}).catch(() => {
					_this.$message({
						type: 'info',
						message: '已取消'
					});
				});
			},
		},
	}
</script>

<style scoped>
	.list {
		height: 300px;
		width: 100%;
		/* margin-left: 130px; */
		/* display: flex; */
	}

	.list_text {
		height: 50px;
		width: 100%;
		vertical-align: middle;
		line-height: 50px;
		text-decoration: none;
		padding: 0.7em 4.0em;
		font-size: 20px;
		letter-spacing: 5px;
		color: #FFFFFF;
	}

	.list_text:hover {
		/* color: rgb(0, 158, 1); */
		font-weight: 600;
	}

	.router-link-active:hover {
		font-weight: 600;
		color: #FFFFFF;
	}

	.router-link-active {
		background-color: rgb(67,74,80);
		color: #FFFFFF;
		font-weight: 600;
		/* border-right: 3px solid #000000; */
		
	}
	.list-title {
		height: 50px;
		width: 100%;
		/* border-bottom: 2px solid rgb(244,244,244); */
		text-align: center;
		background: rgb(84,92,100);
	}
	.list-title:hover{
		/* background: rgb(67,74,80); */
		/* border-bottom: 5px solid rgb(67,74,80); */
	}
</style>
