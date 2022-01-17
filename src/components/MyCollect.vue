<template>
	<div style="height: 0 auto;">
		<div v-show="!vshow" style="padding-top: 20px;">
			<div v-for="(blog,index) in blogs" :key="index" style="border-bottom: 2px solid #818996;width: 90%;margin-left: 5%;">
				<div style="display: flex;padding-top: 10px;padding-bottom: 5px;">
					<div style="width: 70%;cursor: pointer;" @click="gotoDetail(blog.blogID)">
						<span style="font-size: 17px;font-weight: 600;">{{blog.blog.blogName}}</span>
					</div>
					<div style="width: 20%;" @click="gotoDetail(blog.blogID)">
						<span>{{blog.blog.sort}}</span>
					</div>
					<button style="border: none;background: transparent;color: #818996;cursor: pointer;" @click="cancelCollect(blog.blogID)">取消收藏</button>
				</div>
				<div style="padding-bottom: 10px;cursor: pointer;" @click="gotoDetail(blog.blogID)">
					<span>{{handleContent(blog.blog.content)}}</span>
				</div>
				<div style="padding-bottom: 10px;cursor: pointer;" @click="gotoDetail(blog.blogID)">
					<span style="font-size: 13px;color: #818996;">收藏:{{blog.blog.collectCount}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;评论:{{blog.blog.commentAmount}}</span>
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
			<div v-show="bottomShow" style="height: 300px;"></div>
		</div>
		<div v-show="vshow" style="height: 600px;">空空如也~~~~</div>
	</div>
</template>

<script>
	import {Message} from 'element-ui';
	export default {
		name: 'myCollect',
		data(){
			return{
				user: JSON.parse(localStorage.getItem('login_key')),
				totalRecord: 0,
				currPage: 1,
				pageSize: 6,
				vshow:false,
				bottomShow:false,
				blogs:[],
			};
		},
		mounted(){
			this.getMyCollect();
		},
		methods:{
			gotoDetail:function(blogID){
				var _this=this;
				if(_this.user==null){
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
			getMyCollect:function(){
				var _this=this;
				_this.$http({
					method:'GET',
					url:this.apiServer+'api/user/getCollectListByUser',
					params:{
						currPage:_this.currPage,
						pageSize:_this.pageSize,
						userID:_this.user.userID
					},
					header:{
						'content-type': 'application/json'
					}
				}).then(function(res){
					if(res.data.code==0){
						_this.blogs=res.data.data;
						_this.totalRecord=res.data.total;
						if(_this.blogs.length<4){
							_this.bottomShow=true;
						}else{
							_this.bottomShow=false;
						}
						if(_this.totalRecord==0){
							_this.vshow=true;
						}else{
							_this.vshow=false;
						}
					}else{
						alert("数据加载失败");
					}
				})
			},
			cancelCollect:function(blogID){
				var _this = this;
				_this.$confirm('确认要取消收藏？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				})
				.then(() => {
					_this
						.$http({
							method: 'DELETE',
							url: this.apiServer + 'api/user/deleteCollect',
							params: {
								blogID:blogID,
								userID:_this.user.userID
							},
							header: {
								'content-type': 'application/json'
							}
						})
						.then(function(res) {
							if (res.data.code == 0) {
								Message({
									message: '取消收藏成功!！',
									type: 'success'
								});
								_this.getMyCollect();
							} else {
								Message({
									message: '取消收藏失败!！',
									type: 'error'
								});
							}
						});
				}).catch(() => {
					_this.$message({
						type: 'info',
						message: '已取消操作'
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
				_this.getMyCollect();
			},
			handleCurrentChange(val) {
				console.log(`第${val}页 `);
				var _this = this;
				_this.currPage = val;
				_this.getMyCollect();
			}
		},
	}
</script>

<style scoped>
</style>
