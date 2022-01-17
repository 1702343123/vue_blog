<template>
	<div class="body">
		<div class="left" style="width: 30%;background: #FFFFFF;margin-right: 20px;text-align: center;padding-top: 10px;">
			<div class="kind_list">
				<a href="javascript:;" @click="kindID = 0,getBlogs()" :class="{ kind_two: kindID === 0 }" class="kind_one">全部</a>
			</div>
			<div class="kind_list">
				<a href="javascript:;" @click="kindID = kinds[0].id,getBlogs()" :class="{ kind_two: kindID === kinds[0].id }" class="kind_one">{{kinds[0].typeName}}</a>
			</div>
			<div class="kind_list">
				<a href="javascript:;" @click="kindID = kinds[1].id,getBlogs()" :class="{ kind_two: kindID === kinds[1].id }" class="kind_one">{{kinds[1].typeName}}</a>
			</div>
			<div class="kind_list">
				<a href="javascript:;" @click="kindID = kinds[2].id,getBlogs()" :class="{ kind_two: kindID === kinds[2].id }" class="kind_one">{{kinds[2].typeName}}</a>
			</div>
			<div class="kind_list">
				<a href="javascript:;" @click="kindID = kinds[3].id,getBlogs()" :class="{ kind_two: kindID === kinds[3].id }" class="kind_one">{{kinds[3].typeName}}</a>
			</div>
			<div class="kind_list">
				<a href="javascript:;" @click="kindID = kinds[4].id,getBlogs()" :class="{ kind_two: kindID === kinds[4].id }" class="kind_one">{{kinds[4].typeName}}</a>
			</div>
			<div class="kind_list">
				<a href="javascript:;" @click="kindID = kinds[5].id,getBlogs()" :class="{ kind_two: kindID === kinds[5].id }" class="kind_one">{{kinds[5].typeName}}</a>
			</div>
			<div class="kind_list">
				<a href="javascript:;" @click="kindID = kinds[6].id,getBlogs()" :class="{ kind_two: kindID === kinds[6].id }" class="kind_one">{{kinds[6].typeName}}</a>
			</div>
			<div class="kind_list">
				<a href="javascript:;" @click="kindID = kinds[7].id,getBlogs()" :class="{ kind_two: kindID === kinds[7].id }" class="kind_one">{{kinds[7].typeName}}</a>
			</div>
		</div>
		<div class="right" style="width: 70%;background: #FFFFFF;">
			<div v-show="kindID===0" v-for="(blog,index) in blogs" :key="index" style="width: 90%;margin-left: 5%;border-bottom: 1px solid #000000;padding-bottom: 15px;cursor: pointer;" @click="gotoDetail(blog.blogID)">
				<div style="height: 40px;line-height: 40px;">
					<h3>{{blog.blogName}}</h3>
				</div>
				<div style="display: flex;">
					<div style="width: 100%;height: 100px;">
						<div style="height: 85%;">
							<span>{{handleContent(blog.content)}}</span>
						</div>
						<span>收藏:{{blog.collectCount}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;评论:{{blog.commentAmount}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{blog.time}}</span>
					</div>
					<div v-show="blog.imgUrl!=''" calss="right_img">
						<img :src="blog.imgUrl" class="img_size"/>
					</div>
				</div>
			</div>
			<div v-show="kindID===kinds[0].id" v-for="(blog,index) in blogs" :key="index+'2'" style="width: 90%;margin-left: 5%;border-bottom: 1px solid #000000;padding-bottom: 15px;cursor: pointer;" @click="gotoDetail(blog.blogID)">
				<div style="height: 40px;line-height: 40px;">
					<h3>{{blog.blogName}}</h3>
				</div>
				<div style="display: flex;">
					<div style="width: 100%;height: 100px;">
						<div style="height: 85%;">
							<span>{{handleContent(blog.content)}}</span>
						</div>
						<span>收藏:{{blog.collectCount}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;评论:{{blog.commentAmount}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{blog.time}}</span>
					</div>
					<div v-show="blog.imgUrl!=''" calss="right_img">
						<img :src="blog.imgUrl" class="img_size"/>
					</div>
				</div>
			</div>
			<div v-show="kindID===kinds[1].id" v-for="(blog,index) in blogs" :key="index+'3'" style="width: 90%;margin-left: 5%;border-bottom: 1px solid #000000;padding-bottom: 15px;cursor: pointer;" @click="gotoDetail(blog.blogID)">
				<div style="height: 40px;line-height: 40px;">
					<h3>{{blog.blogName}}</h3>
				</div>
				<div style="display: flex;">
					<div style="width: 100%;height: 100px;">
						<div style="height: 85%;">
							<span>{{handleContent(blog.content)}}</span>
						</div>
						<span>收藏:{{blog.collectCount}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;评论:{{blog.commentAmount}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{blog.time}}</span>
					</div>
					<div v-show="blog.imgUrl!=''" calss="right_img">
						<img :src="blog.imgUrl" class="img_size"/>
					</div>
				</div>
			</div>
			<div v-show="kindID===kinds[2].id" v-for="(blog,index) in blogs" :key="index+'4'" style="width: 90%;margin-left: 5%;border-bottom: 1px solid #000000;padding-bottom: 15px;cursor: pointer;" @click="gotoDetail(blog.blogID)">
				<div style="height: 40px;line-height: 40px;">
					<h3>{{blog.blogName}}</h3>
				</div>
				<div style="display: flex;">
					<div style="width: 100%;height: 100px;">
						<div style="height: 85%;">
							<span>{{handleContent(blog.content)}}</span>
						</div>
						<span>收藏:{{blog.collectCount}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;评论:{{blog.commentAmount}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{blog.time}}</span>
					</div>
					<div v-show="blog.imgUrl!=''" calss="right_img">
						<img :src="blog.imgUrl" class="img_size"/>
					</div>
				</div>
			</div>
			<div v-show="kindID===kinds[3].id" v-for="(blog,index) in blogs" :key="index+'5'" style="width: 90%;margin-left: 5%;border-bottom: 1px solid #000000;padding-bottom: 15px;cursor: pointer;" @click="gotoDetail(blog.blogID)">
				<div style="height: 40px;line-height: 40px;">
					<h3>{{blog.blogName}}</h3>
				</div>
				<div style="display: flex;">
					<div style="width: 100%;height: 100px;">
						<div style="height: 85%;">
							<span>{{handleContent(blog.content)}}</span>
						</div>
						<span>收藏:{{blog.collectCount}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;评论:{{blog.commentAmount}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{blog.time}}</span>
					</div>
					<div v-show="blog.imgUrl!=''" calss="right_img">
						<img :src="blog.imgUrl" class="img_size"/>
					</div>
				</div>
			</div>
			<div v-show="kindID===kinds[4].id" v-for="(blog,index) in blogs" :key="index+'6'" style="width: 90%;margin-left: 5%;border-bottom: 1px solid #000000;padding-bottom: 15px;cursor: pointer;" @click="gotoDetail(blog.blogID)">
				<div style="height: 40px;line-height: 40px;">
					<h3>{{blog.blogName}}</h3>
				</div>
				<div style="display: flex;">
					<div style="width: 100%;height: 100px;">
						<div style="height: 85%;">
							<span>{{handleContent(blog.content)}}</span>
						</div>
						<span>收藏:{{blog.collectCount}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;评论:{{blog.commentAmount}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{blog.time}}</span>
					</div>
					<div v-show="blog.imgUrl!=''" calss="right_img">
						<img :src="blog.imgUrl" class="img_size"/>
					</div>
				</div>
			</div>
			<div v-show="kindID===kinds[5].id" v-for="(blog,index) in blogs" :key="index+'7'" style="width: 90%;margin-left: 5%;border-bottom: 1px solid #000000;padding-bottom: 15px;cursor: pointer;" @click="gotoDetail(blog.blogID)">
				<div style="height: 40px;line-height: 40px;">
					<h3>{{blog.blogName}}</h3>
				</div>
				<div style="display: flex;">
					<div style="width: 100%;height: 100px;">
						<div style="height: 85%;">
							<span>{{handleContent(blog.content)}}</span>
						</div>
						<span>收藏:{{blog.collectCount}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;评论:{{blog.commentAmount}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{blog.time}}</span>
					</div>
					<div v-show="blog.imgUrl!=''" calss="right_img">
						<img :src="blog.imgUrl" class="img_size"/>
					</div>
				</div>
			</div>
			<div v-show="kindID===kinds[6].id" v-for="(blog,index) in blogs" :key="index+'8'" style="width: 90%;margin-left: 5%;border-bottom: 1px solid #000000;padding-bottom: 15px;cursor: pointer;" @click="gotoDetail(blog.blogID)">
				<div style="height: 40px;line-height: 40px;">
					<h3>{{blog.blogName}}</h3>
				</div>
				<div style="display: flex;">
					<div style="width: 100%;height: 100px;">
						<div style="height: 85%;">
							<span>{{handleContent(blog.content)}}</span>
						</div>
						<span>收藏:{{blog.collectCount}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;评论:{{blog.commentAmount}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{blog.time}}</span>
					</div>
					<div v-show="blog.imgUrl!=''" calss="right_img">
						<img :src="blog.imgUrl" class="img_size"/>
					</div>
				</div>
			</div>
			<div v-show="kindID===kinds[7].id" v-for="(blog,index) in blogs" :key="index+'9'" style="width: 90%;margin-left: 5%;border-bottom: 1px solid #000000;padding-bottom: 15px;cursor: pointer;" @click="gotoDetail(blog.blogID)">
				<div style="height: 40px;line-height: 40px;">
					<h3>{{blog.blogName}}</h3>
				</div>
				<div style="display: flex;">
					<div style="width: 100%;height: 100px;">
						<div style="height: 85%;">
							<span>{{handleContent(blog.content)}}</span>
						</div>
						<span>收藏:{{blog.collectCount}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;评论:{{blog.commentAmount}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{blog.time}}</span>
					</div>
					<div v-show="blog.imgUrl!=''" calss="right_img">
						<img :src="blog.imgUrl" class="img_size"/>
					</div>
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
			
		</div>
	</div>
</template>

<script>
	import {Message} from 'element-ui';
	export default {
		name: 'Blog',
		data(){
			return{
				user:JSON.parse(localStorage.getItem('login_key')),//获取本地存储的user信息
				kindID:0,
				totalRecord: 0,
				currPage: 1,
				pageSize: 6,
				kinds2:[],
				blogs:[],
				kinds:[],
				// vshow:false,
			};
		},
		mounted(){
			this.getType();
			this.getBlogs();
		},
		methods:{
			getType:function(){
				var _this=this;
				_this.$http({
					method:'GET',
					url:this.apiServer+'api/blog/getTypeList',
					header:{
					'content-type': 'application/json'
					}
				}).then(function(res){
					if(res.data.code==0){
						_this.kinds = res.data.data;
						console.log(_this.kinds);
						console.log(_this.kinds[0].typeName);
					}else{
						alert('加载数据失败');
					}
				})
			},
			getBlogs:function(){
				var _this=this;
				_this.$http({
					method:'GET',
					url:this.apiServer+'api/blog/getBlogListByType',
					params:{
						typeID:_this.kindID,
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
				_this.getBlogs();
			},
			handleCurrentChange(val) {
				console.log(`第${val}页 `);
				var _this = this;
				_this.currPage = val;
				_this.getBlogs();
			}
		}
	}
</script>

<style scoped>
	.body{
		width: 100%;
		display: flex;
	}
	.kind_list{
		height: 50px;
		line-height: 50px;
		width: 100%;
		border-bottom: 4px solid rgb(250,250,250);
	}
	.kind_one{
		font-size: 18px;
		color: rgb(84,92,100);
		text-decoration: none;
		border-bottom: #818996;
	}
	.kind_two{
		font-size: 18px;
		color:rgb(67,74,80);
		text-decoration: none;font-weight: 600;
	}
	.right_img{
		width: 30%;
		height:100px;
		/* text-align: right; */
	}
	.img_size{
		max-height: 100px;
		max-width: 100%;
	}
</style>
