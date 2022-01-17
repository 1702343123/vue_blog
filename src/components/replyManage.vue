<template>
	<div style="padding-left: 30px;padding-top: 20px;width: 1240px;">
		<el-table :data="comments" style="width: 100%">
			<el-table-column label="评论日期" width="180">
			  <template slot-scope="scope">
				<i class="el-icon-time"></i>
				<span style="margin-left: 10px">{{ scope.row.time }}</span>
			  </template>
			</el-table-column>
			<el-table-column  label="评论用户" width="180">
			  <template slot-scope="scope">
				<el-popover trigger="hover" placement="top">
				  <p>用户ID: {{ scope.row.user.userID }}</p>
				  <p>真实姓名: {{ scope.row.user.realName }}</p>
				  <p>手机号码: {{ scope.row.user.phoneNumber }}</p>
				  <div slot="reference" class="name-wrapper">
					<el-tag size="medium">{{ scope.row.user.userName }}</el-tag>
				  </div>
				</el-popover>
			  </template>
			</el-table-column>
			<el-table-column label="博客标题" width="180">
			  <template slot-scope="scope">
				<el-popover trigger="hover" placement="top">
				  <p>博客ID: {{ scope.row.blog.blogID }}</p>
				  <div slot="reference" class="name-wrapper">
					<el-tag size="medium">{{ scope.row.blog.blogName }}</el-tag>
				  </div>
				</el-popover>
			  </template>
			</el-table-column>
			<el-table-column label="评论内容" width="250">
			  <template slot-scope="scope">
				<span style="">{{ scope.row.content }}</span>
			  </template>
			</el-table-column>
			<el-table-column label="操作">
			  <template slot-scope="scope">
				<!-- <el-button size="mini" >编辑</el-button> -->
				<el-button size="mini" type="danger" @click="deleteComment(scope.row.id)">删除</el-button>
			  </template>
			</el-table-column>
		  </el-table>
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
	import {
		Message
	} from 'element-ui';
	export default {
		name: 'replyManage',
		data(){
			return{
				comments:[],
				totalRecord: 0,
				currPage: 1,
				pageSize: 9,
				search: '',
			};
		},
		mounted(){
			this.getAllComment();
		},
		methods:{
			getAllComment:function(){
				var _this=this;
				_this.$http({
					method:'GET',
					url:this.apiServer+'api/user/getAllComment',
					params:{
						currPage:_this.currPage,
						pageSize:_this.pageSize
					},
					header:{
					'content-type': 'application/json'
					}
				}).then(function(res){
					if(res.data.code==0){
						_this.comments = res.data.data;
						_this.totalRecord=res.data.total;
					}else{
						alert('加载数据失败');
					}
				})
			},
			deleteComment: function(id) {
				var _this = this;
				_this.$confirm('确认要删除该条评论吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				})
				.then(() => {
					_this.$http({
							method: 'DELETE',
							url: this.apiServer + 'api/user/deleteComment',
							params: {
								id:id
							},
							header: {
								'content-type': 'application/json'
							}
						}).then(function(res) {
							if (res.data.code == 0) {
								_this.getAllComment();
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
				_this.getAllComment();
			},
			handleCurrentChange(val) {
				console.log(`第${val}页 `);
				var _this = this;
				_this.currPage = val;
				_this.getAllComment();
			}
		},
	}
</script>

<style scoped>
</style>
