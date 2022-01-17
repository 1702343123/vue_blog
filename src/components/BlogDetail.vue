<template>
	<div style="width: 100%;">
		<div style="background: #FFFFFF;height: 0 auto;">
			<div style="text-align: center;padding-top: 30px;">
				<h1>{{blog.blogName}}</h1>
			</div>
			<div style="display: flex;">
				<div style="width: 50%;text-align: right;">
					<img :src="blog.autor.headUrl"  style="width: 50px;height: 50px;border-radius: 50%;"/>
				</div>
			    <div style="line-height: 50px;padding-left: 5px;">
					<span>{{blog.autor.userName}}</span>
					<button v-if="blog.autor.isFollow==0" style="border: none;background: transparent;cursor: pointer;color:#818996;" @click="addFollow(blog.userID)">+关注</button>
					<button v-if="blog.autor.isFollow==1" style="border: none;background: transparent;cursor: pointer;color:#818996;" @click="cancelFollow(blog.userID)">已关注</button>
				</div>
			</div>
			<div style="text-align: center;margin-bottom: 50px;">
				<span style="font-size: 13px;color: #818996;">发布时间:{{blog.time}}&nbsp;&nbsp;&nbsp;&nbsp;收藏:{{blog.collectCount}}&nbsp;&nbsp;&nbsp;&nbsp;评论:{{blog.commentAmount}}</span>
			</div>
			<div style="width: 80%;margin-left: 10%;">
				<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{blog.content}}</p>
			</div>
			<div v-show="blog.imgs[0]!=null" style="width: 80%;margin-left: 10%;">
				<img v-for="(img,index) in blog.imgs" :key="index" :src="img.imgUrl" style="max-height: 200px;max-width: 100%;margin-right: 10px;margin-bottom: 5px;"/>
			</div>
			<div v-show="blog.imgs[0]==null" style="height: 100px;"></div>
			<div style="width: 80%;margin-left: 10%;text-align: right;margin-top: 20px;">
				<span v-show="blog.isCollect==0" style="color: #818996;cursor: pointer;" @click="addCollect(blog.blogID)">☆收藏</span>
				<span v-show="blog.isCollect==1" style="color: #818996;cursor: pointer;" @click="cancelCollect(blog.blogID)">★已收藏</span>
			</div>
			<div style="display: flex;width: 80%;margin-left: 10%;margin-top: 30px;height: 40px;border-top: 2px solid #818996;padding-top: 30px;">
				<span style="line-height: 40px;">评论：</span>
				<div class="answer-input" style="width: 40%;"><el-input type="text" :rows="1" v-model="myreply" placeholder="快来评论吧!!" /></div>
				<button class="answer-btn" style="background: rgb(84,92,100);color: #FFFFFF;border: 0px;border-radius: 5px;width: 70px;margin-left: 10px;" @click="insertComment()">提交</button>
			</div>
			<div v-show="blog.comments[0]!=null" style="margin-top: 20px;">
				<div style="width: 80%;margin-left: 10%;margin-bottom: 20px;">
					<span>评论列表：</span>
				</div>
				<div v-for="(comment,index) in blog.comments" :key="index" style="display: flex;width: 80%;margin-left: 10%;border-top: 1px solid #818996;padding-bottom: 15px;padding-top: 10px;">
					<div style="width: 10%;">
						<img :src="comment.headUrl" style="height: 75px;width: 75px;border-radius: 50%;"/>
					</div>
					<div style="width: 80%;">
						<div style="height: 40%;line-height: 28px;display: flex;">
							<span style="font-size: 17px;">{{comment.userName}}</span>
							<div style="margin-left: 50px;font-size: 13px;color: #818996;">
								{{comment.time}}
							</div>
						</div>
						<div style="height: 60%;margin-top: 5px;font-size: 15px;">
							<span>{{comment.content}}</span>
						</div>
					</div>
					<div v-show="comment.userID==user.userID" style="line-height: 75px;padding-left: 20px;">
						<button style="border: none;background: transparent;cursor: pointer;color: #FF0000;" @click="deleteComment(comment.id)">删除</button>
					</div>
				</div>
				<div style="width: 80%;margin-left: 10%;border-top: 1px solid #818996;padding-bottom: 50px;"></div>
			</div>
			<div v-show="blog.comments[0]==null" style="height: 250px;width: 80%;margin-left: 10%;line-height: 200px;">
				还没有人评论！！
			</div>
		</div>
	</div>
</template>

<script>
	import {Message} from 'element-ui';
	export default {
		name: 'BlogDetail',
		data(){
			return{
				user:JSON.parse(localStorage.getItem('login_key')),//获取本地存储的user信息
				blogID:0,
				blog:{},
				myreply:'',
			};
		},
		mounted(){
			this.getId();
			this.getBlogDetail();
		},
		methods:{
			getId: function() {
				var _this = this;
				_this.blogID = _this.$route.query.blogID;
			},
			getBlogDetail: function() {
				var _this = this;
				if(_this.user==null){
					_this.$http({
						method: 'GET',
						url: this.apiServer + 'api/blog/getBlogByID',
						header: {
							'content-type': 'application/json'
						},
						params: {
							blogID:_this.blogID,
						}
					}).then(function(res) {
						if (res.data.code == 0) {
							_this.blog = res.data.data;
							console.log(_this.news);
						} else {
							alert('加载数据失败');
						}
					})
				}else{
					_this.$http({
						method: 'GET',
						url: this.apiServer + 'api/blog/getBlogByID',
						header: {
							'content-type': 'application/json'
						},
						params: {
							blogID:_this.blogID,
							userID:_this.user.userID
						}
					}).then(function(res) {
						if (res.data.code == 0) {
							_this.blog = res.data.data;
						} else {
							alert('加载数据失败');
						}
					})
				}
			},
			addCollect:function(blogID){
				var _this = this;
				_this.$confirm('确认要添加到自己的收藏中吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					_this.$http({
							method: 'POST',
							url: this.apiServer + 'api/user/addCollect',
							params: {
								blogID:blogID,
								userID:_this.user.userID
							},
							header: {
								'content-type': 'application/json'
							}
						}).then(function(res) {
							if (res.data.code == 0) {
								Message({
									message: '收藏成功!！',
									type: 'success'
								});
								_this.getBlogDetail();
							} else {
								Message({
									message: '收藏失败!！',
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
			cancelCollect:function(blogID){
				var _this = this;
				_this.$confirm('确认要取消收藏？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					_this.$http({
							method: 'DELETE',
							url: this.apiServer + 'api/user/deleteCollect',
							params: {
								blogID:blogID,
								userID:_this.user.userID
							},
							header: {
								'content-type': 'application/json'
							}
						}).then(function(res) {
							if (res.data.code == 0) {
								Message({
									message: '取消收藏成功!！',
									type: 'success'
								});
								_this.getBlogDetail();
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
			cancelFollow:function(followed){
				var _this = this;
				_this.$confirm('确认要取消关注？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					_this.$http({
							method: 'DELETE',
							url: this.apiServer + 'api/user/deleteFollow',
							params: {
								followed:followed,
								follower:_this.user.userID
							},
							header: {
								'content-type': 'application/json'
							}
						}).then(function(res) {
							if (res.data.code == 0) {
								Message({
									message: '取消关注成功!！',
									type: 'success'
								});
								_this.getBlogDetail();
							} else {
								Message({
									message: '取消关注失败!！',
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
			addFollow:function(followed){
				var _this = this;
				_this.$confirm('确认要关注该博主吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					_this.$http({
							method: 'POST',
							url: this.apiServer + 'api/user/addFollow',
							params: {
								followed:followed,
								follower:_this.user.userID
							},
							header: {
								'content-type': 'application/json'
							}
						}).then(function(res) {
							if (res.data.code == 0) {
								Message({
									message: '关注成功!！',
									type: 'success'
								});
								_this.getBlogDetail();
							} else {
								Message({
									message: '关注失败!！',
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
			insertComment:function(){
				var _this=this;
				_this.$http({
					method: 'POST',
					url: this.apiServer + 'api/user/insertComment',
					params: {
						blogID:_this.blogID,
						content:_this.myreply,
						userID:_this.user.userID
					},
					header: {
						'content-type': 'application/json'
					}
				}).then(function(res) {
					if (res.data.code == 0) {
						Message({
							message: '评论成功!！',
							type: 'success'
						});
						_this.getBlogDetail();
					} else {
						Message({
							message: '评论失败!！',
							type: 'error'
						});
					}
				})
			},
			deleteComment:function(commentID){
				var _this = this;
				_this.$confirm('确认要删除该条评论吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					_this.$http({
							method: 'DELETE',
							url: this.apiServer + 'api/user/deleteComment',
							params: {
								id:commentID
							},
							header: {
								'content-type': 'application/json'
							}
						}).then(function(res) {
							if (res.data.code == 0) {
								Message({
									message: '删除成功!！',
									type: 'success'
								});
								_this.getBlogDetail();
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
						message: '已取消操作'
					});
				});
			},
		},
	}
</script>

<style scoped>
	
</style>
