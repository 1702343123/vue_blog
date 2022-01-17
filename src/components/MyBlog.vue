<template>
	<div style="height: 0 auto;">
		<div v-show="!vshow" style="padding-top: 20px;">
			<div v-for="(myBlog,index) in myBlogs" :key="index" style="border-bottom: 2px solid #818996;width: 90%;margin-left: 5%;">
				<div style="display: flex;padding-top: 10px;padding-bottom: 5px;">
					<div style="width: 70%;cursor: pointer;" @click="gotoDetail(myBlog.blogID)">
						<span style="font-size: 17px;font-weight: 600;">{{myBlog.blogName}}</span>
					</div>
					<div style="width: 20%;" @click="gotoDetail(myBlog.blogID)">
						<div style="border: 1px solid #818996;color: #818996;width: 65px;height: 25px;text-align: center;line-height: 25px;border-radius: 10px;">
							<span style="">{{myBlog.sort}}</span>
						</div>
					</div>
					<button style="border: none;background: transparent;cursor: pointer;color: #FF0000;" @click="deleteBlog(myBlog.blogID)">删除</button>
				</div>
				<div style="padding-bottom: 10px;cursor: pointer;" @click="gotoDetail(myBlog.blogID)">
					<span>{{handleContent(myBlog.content)}}</span>
				</div>
				<div style="padding-bottom: 10px;cursor: pointer;" @click="gotoDetail(myBlog.blogID)">
					<span style="font-size: 13px;color: #818996;">{{myBlog.time}}</span>
				</div>
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
			<div v-show="bottomShow" style="height: 200px;"></div>
		</div>
		<div v-show="vshow" style="height: 600px;">空空如也~~~~</div>
	</div>
</template>

<script>
	import {Message} from 'element-ui';
	export default {
		name: 'myBlog',
		data(){
			return{
				loginUser: JSON.parse(localStorage.getItem('login_key')),
				totalRecord: 0,
				currPage: 1,
				pageSize: 8,
				vshow:false,
				bottomShow:false,
				myBlogs:[],
			};
		},
		mounted: function() {
			this.getMyBlog();
		},
		methods:{
			gotoDetail:function(blogID){
				var _this=this;
				if(_this.loginUser==null){
					_this.$confirm('您还未登录，请先登录？', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						_this.$router.push('/sign');
					}).catch(() => {
						_this.$message({
							type: 'info',
							message: '已取消'
						});
					});
				}else{
					_this.$router.push({
						path: '/blog/blogDetail',
						query: {
							blogID: blogID
						}
					});
				}
			},
			getMyBlog: function() {
				var _this = this;
				console.log('getMyBlog');
				_this.$http({
						method: 'GET',
						url: this.apiServer + 'api/blog/getBlogListByUser',
						params: {
							userID: _this.loginUser.userID,
							currPage: _this.currPage,
							pageSize: _this.pageSize
						},
						header: {
							'content-type': 'application/json'
						}
					})
					.then(function(res) {
						if (res.data.code == 0) {
							_this.myBlogs = res.data.data;
							_this.totalRecord = res.data.total;
							console.log(_this.totalRecord);
							if (_this.totalRecord == 0) {
								_this.vshow = true;
							}
							if (_this.myBlogs.length == 0) {
								_this.currPage = _this.currPage - 1;
								_this.getMyBlog();
							}
							if(_this.myBlogs.length<3){
								_this.bottomShow=true;
							}else{
								_this.bottomShow=false;
							}
						} else {
							Message({
								message: '数据加载失败!！',
								type: 'error'
							});
						}
					});
			},
			deleteBlog: function(eId) {
				var _this = this;
				_this.$confirm('确认要删除该Blog？一经删除无法找回，请谨慎操作！', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				})
				.then(() => {
					console.log('deleteBlog:eId(' + eId + ')');
					_this
						.$http({
							method: 'DELETE',
							url: this.apiServer + 'api/blog/deleteBlog',
							params: {
								blogID: eId
							},
							header: {
								'content-type': 'application/json'
							}
						})
						.then(function(res) {
							if (res.data.code == 0) {
								Message({
									message: '删除成功!！',
									type: 'success'
								});
								_this.getMyBlog();
							} else {
								Message({
									message: '删除失败!！',
									type: 'error'
								});
							}
						});
				})
				.catch(() => {
					_this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
		},
			handleContent:function(content){
				content = content.replace(/(\n)/g, "");
				content = content.replace(/(\t)/g, "");
				content = content.replace(/(\r)/g, "");
				content = content.replace(/<\[^>]*>/g, "");
				content = content.replace(/\s*/g, "");
				if(content.length>65){
					return content.substring(0,65)+'...[详情]';
				}else{
					return content.substring(0,65)
				}
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
				var _this = this;
				_this.pageSize = val;
				_this.getMyBlog();
			},
			handleCurrentChange(val) {
				console.log(`第${val}页 `);
				var _this = this;
				_this.currPage = val;
				_this.getMyBlog();
			},
		},
	}
</script>

<style scoped>
</style>

