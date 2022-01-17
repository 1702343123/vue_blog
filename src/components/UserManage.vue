<template>
	<div style="padding-top: 20px;padding-left: 30px;width: 1240px;">
		<div>
			<el-table
				:data="users.filter(data => !search || data.userName.toLowerCase().includes(search.toLowerCase()))"
				style="width: 100%">
				<el-table-column
				  label="注册时间"
				  width="180">
				  <template slot-scope="scope">
					<i class="el-icon-time"></i>
					<span style="">{{ scope.row.time }}</span>
				  </template>
				</el-table-column>
				<el-table-column
				  label="昵称"
				  width="150">
				  <template slot-scope="scope">
					<el-popover trigger="hover" placement="top">
					  <p>姓名: {{ scope.row.realName }}</p>
					  <p>性别: {{ scope.row.sex }}</p>
					  <p>博客数: {{ scope.row.blogCount }}</p>
					  <p>QQ: {{ scope.row.qq }}</p>
					  <p>邮箱: {{ scope.row.email }}</p>
					  <p>住址: {{ scope.row.address }}</p>
					  <div slot="reference" class="name-wrapper">
						<el-tag size="medium">{{ scope.row.userName }}</el-tag>
					  </div>
					</el-popover>
				  </template>
				</el-table-column>
				<el-table-column
				  label="手机号码"
				  width="170">
				  <template slot-scope="scope">
					<span style="">{{ scope.row.phoneNumber }}</span>
				  </template>
				</el-table-column>
				<el-table-column
				  label="密码"
				  width="170">
				  <template slot-scope="scope">
					<span style="">{{ scope.row.password }}</span>
				  </template>
				</el-table-column>
				<el-table-column
				  label="头像"
				  width="170">
				  <template slot-scope="scope">
					<img :src="scope.row.headUrl" style="width: 50px;height: 50px;border-radius: 50%;"/>
				  </template>
				</el-table-column>
				<el-table-column
				  label="状态(0:正常;1:禁用)"
				  width="170">
				  <template slot-scope="scope">
					<span style="">{{ scope.row.isUse }}</span>
				  </template>
				</el-table-column>
				<el-table-column >
					<template slot="header" slot-scope="scope">
						<el-input
						  v-model="search"
						  size="mini"
						  placeholder="输入关键字搜索"/>
					</template>
					<template slot-scope="scope">
						<el-button v-show="scope.row.isUse==0" size="mini" @click="jinyongUser(scope.row.userID)">禁用</el-button>
						<el-button v-show="scope.row.isUse==1" size="mini" @click="jinyongUser(scope.row.userID)">启用</el-button>
						<el-button size="mini" type="danger" @click="deleteUser(scope.row.userID)">删除</el-button>
				    </template>
				</el-table-column>
			</el-table>
		</div>
		<div style="height: 60px;text-align: center;padding-top: 20px;">
			<el-pagination
				background
				layout="prev, pager, next,jumper"
				:total="totalRecord"
				:page-size="pageSize"
				:current-page="currPage"
				@current-change="handleCurrentChange"
			></el-pagination>
		</div>
	</div>
</template>

<script>
	import {Message} from 'element-ui';
	export default {
		name: 'userManage',
		data(){
			return{
				users:[],
				totalRecord: 0,
				currPage: 1,
				pageSize: 6,
				search: ''
			};
		},
		mounted(){
			this.getAllUser();
		},
		methods:{
			getAllUser:function(){
				var _this=this;
				_this.$http({
					method:'GET',
					url:this.apiServer+'api/user/getAllUser',
					params:{
						currPage:_this.currPage,
						pageSize:_this.pageSize
					},
					header:{
					'content-type': 'application/json'
					}
				}).then(function(res){
					if(res.data.code==0){
						_this.users = res.data.data;
						_this.totalRecord=res.data.total;
					}else{
						alert('加载数据失败');
					}
				})
			},
			jinyongUser:function(userID){
				var _this=this;
				_this.$http({
					method:'GET',
					url:this.apiServer+'api/user/cancelUser',
					params:{
						userID:userID
					},
					header:{
					'content-type': 'application/json'
					}
				}).then(function(res){
					if(res.data.code==0){
						_this.getAllUser();
						Message({
							message: '操作成功!！',
							type: 'success'
						});
					}else{
						alert('加载数据失败');
					}
				})
			},
			deleteUser: function(userID) {
				var _this = this;
				_this.$confirm('确认要删除该用户吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				})
				.then(() => {
					_this.$http({
							method: 'DELETE',
							url: this.apiServer + 'api/user/deleteUser',
							params: {
								userID:userID
							},
							header: {
								'content-type': 'application/json'
							}
						}).then(function(res) {
							if (res.data.code == 0) {
								_this.getAllUser();
								Message({
									message: '删除成功!！',
									type: 'success'
								});
							} else {
								Message({
									message: '删除失败!！',
									type: 'error'
								});
							}
						});
				}).catch(() => {
					_this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
				var _this = this;
				_this.pageSize = val;
				_this.getAllUser();
			},
			handleCurrentChange(val) {
				console.log(`第${val}页 `);
				var _this = this;
				_this.currPage = val;
				_this.getAllUser();
			}
		},
	}
</script>

<style scoped>
</style>
