<template>
	<div style="width: 100%;background: #FFFFFF;">
		<div style="width: 80%;margin-left: 10%;display: flex;height: 50px;line-height: 50px;padding-top: 50px;">
			<span style="font-size: 17px;">标&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;题：</span>
			<div style="width: 50%;">
				<el-input type="text" v-model="title" placeholder="请输入博客标题" />
			</div>
		</div>
		<div style="width: 80%;margin-left: 10%;display: flex;margin-top: 20px;height: 50px;line-height: 50px;">
			<span style="font-size: 17px;">选择分类：</span>
				<div class="e">
					<el-select v-model="fenlei" placeholder="选择分类">
						<el-option v-for="item in kinds" :key="item.id" :label="item.typeName" :value="item.id">
						</el-option>
					</el-select>
				</div>
		</div>
		<div style="width: 80%;margin-left: 10%;margin-top: 20px;">
			<span style="font-size: 17px;">博客内容：</span>
			<div style="margin-top: 10px;">
				<el-input type="textarea" :rows="7" v-model="content" placeholder="请输入博客内容" />
			</div>
		</div>
		<div class="tupian" style="width: 80%;margin-left: 10%;margin-top: 20px;">
			<el-upload class="upload-demo" action="http://localhost:8888/api/img/insetImg" :on-preview="handlePictureCardPreview"
				:on-remove="handleRemove" :before-remove="beforeRemove" :on-success="handleSuccess" multiple :limit="9" :on-exceed="handleExceed"
				:file-list="fileList" list-type="picture-card">
				<i class="el-icon-plus"></i>
				<div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
			</el-upload>
			<el-dialog :visible.sync="dialogVisible">
				<img width="100%" :src="dialogImageUrl" alt="">
			</el-dialog>
		</div>
		<div style="width: 80%;margin-left: 10%;margin-top: 50px;padding-bottom: 50px;height: 50px;line-height: 50px;">
			<button class="btn" @click="putBlog()">提交</button>
		</div>
	</div>
</template>

<script>
	import {Message} from 'element-ui';
	export default {
		name: 'newBlog',
		data(){
			return{
				user:JSON.parse(localStorage.getItem('login_key')),//获取本地存储的user信息
				content:'',
				title:'',
				fenlei:null,
				kinds:[],
				imageUrl: '',
				//文件上传的参数
				dialogImageUrl: '',
				dialogVisible: false,
				//图片列表（用于在上传组件中回显图片）
				fileList: [],
				imgs: [],
			};
		},
		mounted(){
			this.getType();
		},
		methods:{
			putBlog:function(){
				var _this=this;
				_this.$http({
					method:'POST',
					url:this.apiServer+'api/blog/createBlog?blogName='+_this.title+'&content='+_this.content+'&id='+_this.fenlei+'&imgs='+_this.imgs+'&userID='+_this.user.userID,
// 					params:{
// 						blogName:_this.title,
// 						content:_this.content,
// 						id:_this.sort,
// 						imgs:_this.imgs,
// 						userID:_this.user.userID
// 					},
					header:{
					'content-type': 'application/json'
					},
				}).then(function(res){
					if(res.data.code==0){
						Message({
							message: '发布成功!！',
							type: 'success',
						});
						_this.$router.push('/blog');
					}else{
						Message({
							message: '发布失败!！',
							type: 'error',
						});
					}
				})
			},
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
					}else{
						alert('加载数据失败');
					}
				})
			},
			handleAvatarSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;
			
				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},
			//文件上传成功的钩子函数
			handleSuccess(res, file) {
				this.$message({
					type: 'info',
					message: '图片上传成功',
					duration: 6000
				});
				this.imageUrl = res.data;
				this.imgs.push(this.imageUrl);
			},
			onExceed(files, fileList) {
				this.$message({
					type: 'info',
					message: '最多只能上传一个图片',
					duration: 6000
				});
			},
			//文件上传前的前的钩子函数
			//参数是上传的文件，若返回false，或返回Primary且被reject，则停止上传
			beforeUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isGIF = file.type === 'image/gif';
				const isPNG = file.type === 'image/png';
				const isBMP = file.type === 'image/bmp';
				const isLt2M = file.size / 1024 / 1024 < 2;
			
				if (!isJPG && !isGIF && !isPNG && !isBMP) {
					this.$message.error('上传图片必须是JPG/GIF/PNG/BMP 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传图片大小不能超过 2MB!');
				}
				return (isJPG || isBMP || isGIF || isPNG) && isLt2M;
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
			handleExceed(files, fileList) {
				this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
			},
			beforeRemove(file, fileList) {
				return this.$confirm(`确定移除 ${ file.name }？`);
			},
			handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
		},
	}
</script>

<style scoped>
	.btn{
		height: 40px;
		width: 150px;
		font-size: 17px;
		cursor: pointer;
		border: 0px;
		border-radius: 5px;
		background: rgb(84,92,100);
		color: #FFFFFF;
		font-weight: 600;
		cursor: pointer;
	}
</style>
