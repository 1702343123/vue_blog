<template>
	<div id="app">
		<div style="height: 100px;background: rgb(84, 92, 100);color: #FFFFFF;display: flex;position: absolute;position: fixed;width: 100%;">
			<div style="line-height: 100px;padding-left: 30px;font-size: 25px;width: 85%;">
				<span>个人博客管理界面</span>
			</div>
			<div style="padding-top: 25px;display: flex;">
				<img :src="user.headUrl" style="width: 50px;height: 50px;border-radius: 50%;"/>
				<div style="line-height: 50px;margin-left: 10px;font-size: 17px;">
					<span>{{user.userName}}</span>
				</div>
			</div>
		</div>
        <div style="display: flex;">
			<div class="main">
			    <el-row>
			        <el-col>
			            <el-menu
			                    default-active="1"
			                    class="el-menu-vertical-demo"
			                    background-color="#545c64"
			                    text-color="#fff"
			                    active-text-color="#ffd04b">
			                <router-link to="/admin/userManage">
			                    <el-menu-item index="1">
			                        <i class="el-icon-user-solid"></i>
			                        <span slot="title">用户管理</span>
			                    </el-menu-item>
			
			                </router-link>
			                <router-link to="/admin/blogManage">
			                    <el-menu-item index="2">
			                        <i class="el-icon-document"></i>
			                        <span slot="title">博客管理</span>
			                    </el-menu-item>
			                </router-link>
			                <router-link to="/admin/replyManage">
			                    <el-menu-item index="3">
			                        <i class="el-icon-s-comment"></i>
			                        <span slot="title">评论管理</span>
			                    </el-menu-item>
			                </router-link>
			
			                <!-- <router-link to="">
			                    <el-menu-item index="4">
			                        <i class="el-icon-reading"></i>
			                        <span slot="title">文章</span>
			                    </el-menu-item>
			                </router-link> -->
			                </router-link>
							<router-link to="">
							    <el-menu-item index="5">
							        <i class="el-icon-switch-button"></i>
							        <span slot="title" @click="logout()">退出</span>
							    </el-menu-item>
							</router-link>
			            </el-menu>
			
			        </el-col>
			    </el-row>
			
			</div>
			<div class="router">
			    <router-view></router-view>
			</div>
		</div>
    </div>
</template>

<script>
	import {Message} from 'element-ui';
	export default {
		name: 'admin',
		data(){
			return{
				user:JSON.parse(localStorage.getItem('login_key')),//获取本地存储的user信息
			};
		},
		mounted(){
			
		},
		methods:{
			logout:function(){
				var _this=this;
				_this.$confirm('确认要退出登录吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					console.log('log out')
					localStorage.removeItem('login_key');
					_this.$router.push('/index');
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
	.main {
		/* padding: 0;
		margin: 0; */
		position: absolute;
		position: fixed;
		left: 0;
		top: 100px;
		bottom: 0;
		width: 250px;
		background: rgb(84, 92, 100);
  }
  .router {
    /* left: 250px; */
    position: absolute;
	margin-left: 250px;
    top: 100px;
    /* margin: 0; */
	text-decoration: none;
  }
</style>
