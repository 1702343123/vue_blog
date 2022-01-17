<template>
	<div class="all">
		<!-- <div class="container">
		</div> -->
		<div class="sign-box">
			<router-view />
		</div>
	
	</div>
</template>

<script>
	export default {
		name:'Sign',
		data(){
			return{
				
			};
		},
	}
</script>

<style scoped>
	* {
		margin: 0px;
		padding: 0px;
	}
	
	.all {
		/* background-color: rgb(241, 241, 241); */
		background-size: 100%;
		width: 100%;
		height: 100%;
		background-image: url(../assets/background1.jpg);
		display: flex;
		/* justify-content: center; */
		/* align-items: center; */
		align-content: ;
		position: fixed;/* 让背景图片撑满全屏 */
	}

	.sign-box {
		
	}
</style>
