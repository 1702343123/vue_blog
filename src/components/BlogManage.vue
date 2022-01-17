<template>
	<div style="padding-left: 30px;padding-top: 20px;">
		<el-table
			:data="blogs.filter(data => !search || data.blogName.toLowerCase().includes(search.toLowerCase()))"
			style="width: 1230px">
			<el-table-column
			  label="发布日期"
			  width="180">
			  <template slot-scope="scope">
				<i class="el-icon-time"></i>
				<span style="">{{ scope.row.time }}</span>
			  </template>
			</el-table-column>
			<el-table-column
			  label="标题"
			  width="180">
			  <template slot-scope="scope">
				<el-popover trigger="hover" placement="top">
				  <p>内容: {{ scope.row.content }}</p>
				  <div slot="reference" class="name-wrapper">
					<el-tag size="medium">{{ scope.row.blogName }}</el-tag>
				  </div>
				</el-popover>
			  </template>
			</el-table-column>
			<el-table-column
			  label="发布者"
			  width="180">
			  <template slot-scope="scope">
				<el-popover trigger="hover" placement="top">
				  <p>真实姓名: {{ scope.row.autor.realName }}</p>
				  <p>手机号码: {{ scope.row.autor.phoneNumber }}</p>
				  <p>密码: {{ scope.row.autor.password }}</p>
				  <div slot="reference" class="name-wrapper">
					<el-tag size="medium">{{ scope.row.autor.userName }}</el-tag>
				  </div>
				</el-popover>
			  </template>
			</el-table-column>
			<el-table-column
			  label="类型"
			  width="180">
			  <template slot-scope="scope">
				<span style="">{{ scope.row.sort }}</span>
			  </template>
			</el-table-column>
			<el-table-column
			  label="收藏数"
			  width="180">
			  <template slot-scope="scope">
				<span style="">{{ scope.row.collectCount }}</span>
			  </template>
			</el-table-column>
			<el-table-column
			  label="评论数"
			  width="180">
			  <template slot-scope="scope">
				<span style="">{{ scope.row.commentAmount }}</span>
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
					<!-- <el-button size="mini">编辑</el-button> -->
					<el-button size="mini" type="danger" @click="deleteBlog(scope.row.blogID)">删除</el-button>
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
		name: 'blogManage',
		data(){
			return{
				totalRecord: 0,
				currPage: 1,
				pageSize: 9,
				blogs:[],
				search:''
			};
		},
		mounted(){
			this.getAllBlog();
		},
		methods:{
			getAllBlog:function(){
				var _this=this;
				_this.$http({
					method:'GET',
					url:this.apiServer+'api/blog/getBlogList',
					params:{
						currPage:_this.currPage,
						pageSize:_this.pageSize
					},
					header:{
					'content-type': 'application/json'
					}
				}).then(function(res){
					if(res.data.code==0){
						_this.blogs = res.data.data;
						_this.totalRecord=res.data.total;
					}else{
						alert('加载数据失败');
					}
				})
			},
			deleteBlog: function(blogID) {
				var _this = this;
				_this.$confirm('确认要删除该博客吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				})
				.then(() => {
					_this.$http({
							method: 'DELETE',
							url: this.apiServer + 'api/blog/deleteBlog',
							params: {
								blogID:blogID
							},
							header: {
								'content-type': 'application/json'
							}
						}).then(function(res) {
							if (res.data.code == 0) {
								_this.getAllBlog();
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
				_this.getAllBlog();
			},
			handleCurrentChange(val) {
				console.log(`第${val}页 `);
				var _this = this;
				_this.currPage = val;
				_this.getAllBlog();
			}
		},
	}
</script>

<style>
</style>
