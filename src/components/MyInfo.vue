<template>
	<div>
		<div class="user-info" v-show="!show">
			<div class="jichu">
				<span style="font-size: 25px;">基础信息</span>
			</div>
			<div class="avatar">
				<span>头&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;像：</span>
				<img :src="userInfo.headUrl" style="height: 60px;width: 60px;margin-top: 5px;" />
			</div>
			<div class="user-name">
				<span>昵&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</span>
				<span>{{userInfo.userName}}</span>
			</div>
			<div class="user-name">
				<div style="width: 50%;">
					<span>手机号码：</span>
					<span>{{userInfo.phoneNumber}}</span>
				</div>
				<div>
					<span>身&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;份：</span>
					<span>{{userInfo.role}}</span>
				</div>
			</div>
			<div class="xiangqing">
				<span style="font-size: 25px;">详情资料</span>
			</div>
			<div class="user-name">
				<div style="width: 50%;">
					<span>真实姓名：</span>
					<span>{{userInfo.realName}}</span>
				</div>
				<div>
					<span>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</span>
					<span>{{userInfo.sex}}</span>
				</div>
			</div>
			<div class="user-name">
				<div style="width: 50%;">
					<span>Q&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Q：</span>
					<span>{{userInfo.qq}}</span>
				</div>
				<div>
					<span>邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱：</span>
					<span>{{userInfo.email}}</span>
				</div>
			</div>
			<div class="user-name">
				<span>地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址：</span>
				<span>{{userInfo.address}}</span>
			</div>
			<div style="border-top: 1px solid rgb(92,92,91);margin-top: 20px;">
				<button class="info-btn" @click="modify()">修改资料</button>
			</div>
		</div>
		<div v-show="show" style="padding-left: 20px;margin-bottom: 50px;">
			<div class="avatar">
				<span>头&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;像：</span>
				<img :src="userInfo.headUrl" style="height: 60px;width: 60px;margin-top: 5px;"/>
				<!-- <button class="avatar-btn">上传头像</button> -->
				<el-upload class="upload-demo" action="http://localhost:8888/api/img/insetImg"
				 :on-success="handleSuccess" :on-exceed="handleExceed"
				 :file-list="fileList" :show-file-list="false"
                 :before-upload="beforeAvatarUpload">
					<button class="avatar-btn">上传头像</button>
				</el-upload>
			</div>
			<div class="user-name">
				<span>昵&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</span>
				<div class="input" style="margin-top: 10px;">
					<el-input type="text" v-model="userInfo.userName" />
				</div>
			</div>
			<div class="user-name">
				<div style="width: 50%;">
					<span>手机号码：</span>
					<span>{{userInfo.phoneNumber}}</span>
				</div>
			</div>
			<div class="user-name">
				<div style="width: 50%;">
					<span>身&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;份：</span>
					<span>{{userInfo.role}}</span>
				</div>
			</div>
			<div class="user-name">
				<div style="width: 50%;">
					<span>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</span>
					<el-radio v-model="userInfo.sex" label="男">男</el-radio>
					<el-radio v-model="userInfo.sex" label="女">女</el-radio>
				</div>
			</div>
			<div class="user-name">
				<div style="display: flex;">
					<span>真实姓名：</span>
					<div style="width: 60%;margin-top: 10px;">
						<el-input type="text" v-model="userInfo.realName" />
					</div>
				</div>
			</div>
			<div class="user-name">
				<div style="width: 50%;display: flex;">
					<span>Q&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Q：</span>
					<div style="width: 70%;margin-top: 10px;">
						<el-input type="text" v-model="userInfo.qq" />
					</div>
				</div>
			</div>
			<div class="user-name">
				<span>邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱：</span>
				<div style="width: 70%;margin-top: 10px;">
					<el-input type="text" v-model="userInfo.email" />
				</div>
			</div>
			<div class="user-name">
				<span>地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址：</span>
				<div style="width: 70%;margin-top: 10px;">
					<el-input type="text" v-model="userInfo.address" />
				</div>
			</div>
			<div style="border-top: 1px solid rgb(92,92,91);margin-top: 20px;">
				<button class="fanhui-btn" @click="back()">返回</button>
				<button class="baocun-btn" @click="update(user)">保存修改</button>
			</div>
		</div>
	</div>
</template>

<script>
	import {Message} from 'element-ui';
	export default {
		name: 'myInfo',
		data(){
			return{
				imageUrl: '',
				//文件上传的参数
				dialogImageUrl: '',
				dialogVisible: false,
				//图片列表（用于在上传组件中回显图片）
				fileList: [],
				imgs: [],
				show:false,
				loginUser: JSON.parse(localStorage.getItem('login_key')),
				userInfo: {},
			};
		},
		mounted: function() {
			this.getUserMsg();
		},
		methods:{
			getUserMsg: function() {
				var _this = this;
				console.log('getUserInfo:userId(' + _this.loginUser.userID + ')')
				_this.$http({
					methods: 'GET',
					url:_this.apiServer+'api/user/userDetail',
					header:{
						'content-type':'application/json'
					},
					params: {
						user_er: _this.loginUser.userID,
						user_ed:_this.loginUser.userID
					}
				}).then(function(res) {
					if (res.data.code == 0) {
						_this.userInfo = res.data.data;
						if(_this.userInfo.role==1){
							_this.userInfo.role='普通用户';
						}
					} else {
						alert('数据加载失败！');
					}
				})
			},
			update: function(user) {
				var _this = this;
				console.log('update:userId(' + _this.loginUser.userID + ')');
				_this.$http({
					method: 'POST',
					url: this.apiServer+'api/user/updateMyMsg',
					params: {
						userID: _this.loginUser.userID,
						userName: _this.userInfo.userName,
						sex: _this.userInfo.sex,
						email: _this.userInfo.email,
						headUrl: _this.userInfo.headUrl,
						realName: _this.userInfo.realName,
						qq: _this.userInfo.qq,
						address: _this.userInfo.address
					},
					header: {
						'content-type': 'application/json'
					}
				}).then(function(res) {
					if (res.data.code == 0) {
						Message({
							message: '修改成功!！',
							type: 'success',
						});
						_this.show = false;
						setTimeout(function() {
							location.reload();
						}, 1000)
					} else {
						Message({
							message: '修改失败!！',
							type: 'error',
							showClose: true
						})
					}
				})
			},
			modify: function() {
				var _this = this;
				_this.show = true;
			},
			back: function() {
				var _this = this;
				_this.show = false;
				_this.getUserMsg();
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
				this.userInfo.headUrl=this.imageUrl;
				// this.user.headUrl=this.userInfo.headUrl;
				// this.imgs.push(this.imageUrl);
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
			// 			handlePreview(file) {
			// 				console.log(file);
			// 			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			handleExceed(files, fileList) {
				this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
			},
			beforeRemove(file, fileList) {
				return this.$confirm(`确定移除 ${ file.name }？`);
			},
		},
	}
</script>

<style scoped>
	.info-btn {
		margin-top: 20px;
		margin-bottom: 20px;
		background-color: rgb(84,92,100);
		color: #FFFFFF;
		border: 0px;
		border-radius: 5px;
		height: 40px;
		width: 100px;
		font-size: 17px;
		cursor: pointer;
	}

	.user-info {
		margin-top: 20px;
		margin-left: 20px;
		margin-right: 20px;
		margin-bottom: 20px;
	}

	.modify {
		margin-top: 40px;
		margin-left: 30px;
		margin-right: 20px;
	}

	.jichu {
		height: 70px;
		line-height: 70px;
		border-bottom: 1px solid rgb(92, 92, 91);
		margin-bottom: 20px;
	}

	.avatar {
		height: 70px;
		display: flex;
	}

	.avatar span {
		line-height: 70px;
		font-size: 16px;
		margin-right: 5px;
	}

	.xiangqing {
		height: 70px;
		line-height: 70px;
		border-bottom: 1px solid rgb(92, 92, 91);
		
		margin-top: 20px;
		margin-bottom: 20px;
	}

	.user-name {
		/* height: 50px; */
		display: flex;
	}

	.user-name span {
		line-height: 50px;
		font-size: 16px;
		margin-right: 5px;
	}

	.avatar-btn {
		margin-top: 35px;
		margin-left: 10px;
		background-color: rgb(84,92,100);
		color: #FFFFFF;
		border: 0px;
		border-radius: 5px;
		height: 30px;
		width: 70px;
		line-height: 30px;
		cursor: pointer;
	}

	.input {
		width: 20%;
		margin-top: 5px;
	}

	.fanhui-btn {
		margin-top: 20px;
		margin-right: 10px;
		background-color: rgb(84,92,100);
		color: #FFFFFF;
		border: 0px;
		border-radius: 5px;
		height: 40px;
		width: 100px;
		font-size: 15px;
		cursor: pointer;
	}

	.baocun-btn {
		margin-top: 20px;
		background-color: rgb(84,92,100);
		color: #FFFFFF;
		border: 0px;
		border-radius: 5px;
		height: 40px;
		width: 100px;
		font-size: 15px;
		cursor: pointer;
	}
</style>
