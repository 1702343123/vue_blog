<template>
	<div class="body" style="display: flex;">
		<div class="left" style="width: 25%;margin-right: 20px;background: #FFFFFF;height: 620px;">
			<div class="title" style="height: 50px;line-height: 50px;text-align: center;border-bottom: 2px solid #000000;">
				<h2>热门博主</h2>
			</div>
			<div class="bloggerList">
				<div v-for="(blogger,index) in bloggers" :key="index" style="display: flex;height: 100px;width: 90%;margin-left: 5%;border-bottom: 1px solid #818996;">
					<div class="head" style="height: 100px;width: 30%;">
						<img :src='blogger.user_ed.headUrl' style="height: 70px;width: 70px;border-radius: 50%;padding-top: 15px;cursor: pointer;"/>
					</div>
					<div style="height: 100px;display: table;width: 40%;margin-left: 10px;">
						<div style="display: table-cell;vertical-align: middle;cursor: pointer;">
							<p style="font-size: 18px;">{{blogger.user_ed.userName}}</p>
							<p style="font-size: 13px;">{{blogger.user_ed.followCount}}人关注</p>
						</div>
					</div>
					<div v-show="blogger.user_ed.isFollow==0" style="text-align: center;line-height: 100px;">
						<button style="width: 60px;height: 35px;border: none;background: transparent;color: #818996;cursor: pointer;" @click="addFollow(blogger.user_ed.userID)">+关注</button>
					</div>
					<div v-show="blogger.user_ed.isFollow==1" style="text-align: center;line-height: 100px;">
						<button style="width: 60px;height: 35px;border: none;background: transparent;color: #818996;cursor: pointer;" @click="cancelFollow(blogger.user_ed.userID)">已关注</button>
					</div>
				</div>
				<div style="text-align: center;height: 40px;line-height: 40px;">
					<span style="font-size: 13px;color: #818996;cursor: pointer;">查看更多>></span>
				</div>
			</div>
		</div>
		<div class="right" style="width: 75%;padding-top: 40px;height: 0 auto;">
			<div style="background: #FFFFFF;border-top: 1px solid #FFFFFF;padding-bottom: 10px;">
				<div style="height: 70px;width: 70px;margin-top:-50px;line-height: 70px;background: #42B983;border-radius: 50%;text-align: center;margin-left: 10px;">
					<h2>Hot</h2>
				</div>
			</div>
			<div class="articleList" style="background: #FFFFFF;">
				<div v-for="(blog,index) in blogs" :key="index" style="border-bottom: 1px solid #818996;width: 90%;margin-left: 5%;padding-bottom: 10px;cursor: pointer;" @click="gotoDetail(blog.blogID)">
					<div style="height: 40px;line-height: 40px;">
						<span style="font-size: 18px;color: #333;text-decoration: none;">{{blog.blog.blogName}}</span>
					</div>
					<div style="display: flex;">
						<div v-show="blog.blog.imgUrl!=''" style="width: 150px;padding-right: 10px;">
							<img :src='blog.blog.imgUrl' style="max-height: 100%;width: 100px;"/>
						</div>
						<div style="width: 100%;height: 100px;">
							<div style="height: 80%;">
								<span>{{handleContent(blog.blog.content)}}</span>
							</div>
							<div style="text-align: right;">
								<span>{{blog.blog.time}}&nbsp;&nbsp;&nbsp;收藏:{{blog.blog.collectCount}}</span>
							</div>
						</div>
					</div>
				</div>
				<div style="height: 50px;line-height: 50px;text-align: center;">
					<span style="font-size: 13px;color: #818996;cursor: pointer;">更多>></span>
				</div>
			</div>
			<div style="height: 40px;"></div>
			<div style="background: #FFFFFF;border-top: 1px solid #FFFFFF;padding-bottom: 10px;">
				<div style="height: 70px;width: 70px;margin-top:-50px;line-height: 70px;background: #42B983;border-radius: 50%;text-align: center;margin-left: 10px;">
					<h2>New</h2>
				</div>
			</div>
			<div class="articleList" style="background: #FFFFFF;">
				<div v-for="(blog,index) in allBlogs" :key="index" v-if="index<5" style="border-bottom: 1px solid #818996;width: 90%;margin-left: 5%;padding-bottom: 10px;cursor: pointer;" @click="gotoDetail(blog.blogID)">
					<div style="height: 40px;line-height: 40px;">
						<span style="font-size: 18px;color: #333;text-decoration: none;">{{blog.blogName}}</span>
					</div>
					<div style="display: flex;">
						<div v-show="blog.imgUrl!=''" style="width: 150px;padding-right: 10px;">
							<img :src='blog.imgUrl' style="max-height: 100%;width: 100px;"/>
						</div>
						<div style="width: 100%;height: 100px;">
							<div style="height: 80%;">
								<span>{{handleContent(blog.content)}}</span>
							</div>
							<div style="text-align: right;">
								<span>{{blog.time}}&nbsp;&nbsp;&nbsp;评论:{{blog.commentAmount}}</span>
							</div>
						</div>
					</div>
				</div>
				<div style="height: 50px;line-height: 50px;text-align: center;">
					<span style="font-size: 13px;color: #818996;cursor: pointer;">更多>></span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:'Home',
		data(){
			return{
				user:JSON.parse(localStorage.getItem('login_key')),//获取本地存储的user信息
				bloggers:[],
				blogs:[],
				allBlogs:[]
			};
		},
		mounted(){
			this.getTopBloger();
			this.getTopBlog();
			this.getAllBlog();
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
			getTopBloger:function(){
				var _this=this;
				if(_this.user==null){
					_this.$http({
						method:'GET',
						url:this.apiServer+'api/user/topFollow',
						header:{
						'content-type': 'application/json'
						}
					}).then(function(res){
						if(res.data.code==0){
							_this.bloggers = res.data.data;
							console.log(_this.bloggers);
						}else{
							alert('加载数据失败');
						}
					})
				}	else{
					_this.$http({
						method:'GET',
						url:this.apiServer+'api/user/topFollow',
						params:{
							loginID:_this.user.userID
						},
						header:{
						'content-type': 'application/json'
						}
					}).then(function(res){
						if(res.data.code==0){
							_this.bloggers = res.data.data;
							console.log(_this.bloggers);
						}else{
							alert('加载数据失败');
						}
					})
				}
			},
			getTopBlog:function(){
				var _this=this;
				_this.$http({
					method:'GET',
					url:this.apiServer+'api/blog/topCollect',
					header:{
					'content-type': 'application/json'
					}
				}).then(function(res){
					if(res.data.code==0){
						_this.blogs = res.data.data;
					}else{
						alert('加载数据失败');
					}
				})	
			},
			getAllBlog:function(){
				var _this=this;
				_this.$http({
					method:'GET',
					url:this.apiServer+'api/blog/getAllBlog',
					header:{
					'content-type': 'application/json'
					}
				}).then(function(res){
					if(res.data.code==0){
						_this.allBlogs = res.data.data;
					}else{
						alert('加载数据失败');
					}
				})	
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
								_this.getTopBloger();
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
								_this.getTopBloger();
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
		}
		
	}
</script>

<style scoped>
	.body{
		width: 100%;
		/* height: 0 auto; */
		/* padding-top: 20px; */
		/* background:#FFFFFF; */
		
	}
</style>
