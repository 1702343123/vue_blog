<template>
	<div style="height: 0 auto;">
		<div v-show="!vshow">
			<div v-for="(blogger,index) in bloggers" :key="index" style="display: flex;width: 90%;margin-left: 5%;border-bottom: 2px solid #818996;height: 110px;">
				<div style="width: 15%;padding-top: 10px;cursor: pointer;">
					<img :src="blogger.user_ed.headUrl" style="height: 90px;width: 90px;border-radius: 50%;"/>
				</div>
				<div style="width: 60%;padding-top: 10px;cursor: pointer;">
					<p style="font-size: 18px;">{{blogger.user_ed.userName}}</p>
					<p style="font-size: 13px;color: rgb(83,83,83);">{{blogger.user_ed.followCount}}人关注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{blogger.user_ed.blogCount}}篇blog</p>
				</div>
				<div style="line-height: 110px;">
					<button style="border: none;background: transparent;color: #818996;cursor: pointer;font-size: 15px;" @click="cancelFollow(blogger.followed)">取消关注</button>
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
		<div v-show="vshow" style="height: 600px;">
			空空如也~~~~
		</div>
	</div>
</template>

<script>
	import {Message} from 'element-ui';
	export default {
		name: 'myFollow',
		data(){
			return{
				user:JSON.parse(localStorage.getItem('login_key')),//获取本地存储的user信息
				vshow:false,
				totalRecord: 0,
				currPage: 1,
				pageSize: 6,
				bloggers:[],
				bottomShow:false,
			};
		},
		mounted(){
			this.getMyFollow();
		},
		methods:{
			getMyFollow:function(){
				var _this=this;
				_this.$http({
					method:'GET',
					url:this.apiServer+'api/user/getFollowByUser',
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
						_this.bloggers=res.data.data;
						_this.totalRecord=res.data.total;
						if(_this.bloggers.length<4){
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
			cancelFollow:function(user_ed){
				var _this = this;
				_this.$confirm('确认要取消关注？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				})
				.then(() => {
					_this
						.$http({
							method: 'DELETE',
							url: this.apiServer + 'api/user/deleteFollow',
							params: {
								follower:_this.user.userID,
								followed:user_ed
							},
							header: {
								'content-type': 'application/json'
							}
						})
						.then(function(res) {
							if (res.data.code == 0) {
								Message({
									message: '取消关注成功!！',
									type: 'success'
								});
								_this.getMyFollow();
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
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
				var _this = this;
				_this.pageSize = val;
				_this.getMyFollow();
			},
			handleCurrentChange(val) {
				console.log(`第${val}页 `);
				var _this = this;
				_this.currPage = val;
				_this.getMyFollow();
			}
		},
	}
</script>

<style scoped>
</style>
