<template>
	<div>
		
		<div class="sharebox">
			
			<img class="ewm" :src="userInfoData.qrCode" >
			<button @click="save" type="primary" style="font-size:15px;position: absolute;bottom: 20%;width: 70%;line-height: 80rpx;height: 80rpx;margin-left: 15%;background-color: #2fa0ed;">保存到相册</button>
		</div>
		
	</div>
</template>


<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				
				userInfoData:{}
			}
		},
		
		onLoad() {
			const self = this;
			self.$Utils.loadAll(['getUserInfoData'], self);
		},
		
		methods: {
			
			save() {
				let self = this
				//若二维码未加载完毕，加个动画提高用户体验
				uni.showToast({
					icon: 'loading',
					title: '正在下载图片',
					duration: 1000
				})
				//判断用户是否授权"保存到相册"
				self.savePhoto()
				/* uni.getSetting({
					success(res) {
						//没有权限，发起授权
						if (!res.authSetting['scope.writePhotosAlbum']) {
							uni.authorize({
								scope: 'scope.writePhotosAlbum',
								success() { //用户允许授权，保存图片到相册
									self.savePhoto();
								},
								fail() { //用户点击拒绝授权，跳转到设置页，引导用户授权
								console.log('fail')
									uni.showToast({
										icon: 'none',
										title: '请至小程序设置中开启相册权限',
										duration: 1000
									})
								}
							})
						} else { //用户已授权，保存到相册
							self.savePhoto()
						}
					}
				}) */
			},
			//保存图片到相册，提示保存成功
			savePhoto() {
				let self = this
				uni.downloadFile({
					url: self.userInfoData.qrCode,
					success: function(res) {
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success(res) {
								uni.showToast({
									title: '保存成功',
									icon: "success",
									duration: 1000
								})
							}
						})
					}
				})
			},
			
			getUserInfoData() {
				const self = this;
				console.log('852369')
				const postData = {
					searchItem:{}
				};
				postData.tokenFuncName = 'getRiderToken'
				postData.searchItem.user_no = uni.getStorageSync('riderInfo').user_no		
				
				const callback = (res) => {
					if (res.solely_code == 100000 && res.info.data[0]) {
						self.userInfoData = res.info.data[0];
					} else {
						self.$Utils.showToast(res.msg, 'none')
					};
					self.$Utils.finishFunc('getUserInfoData');
				};
				self.$apis.userInfoGet(postData, callback);
			},
		},
	}
</script>

<style>
	@import "../../assets/style/public.css";
	@import "../../assets/style/orderNav.css";
	@import "../../assets/style/user.css";
	
.sharebox{position: fixed; top: 0; right: 0; bottom: 0; left: 0;}
.sharebox .bigPic{width: 100%;  height: 100%; display: block;}
.sharebox .back-next{ display: block; left: 4%; top: 35px; font-size:14px;line-height: 22px;color: #666; font-weight: normal;}
.sharebox .back-next .icon{ width: 10px; height:18px; display: block;}
.sharebox .ewm{width: 200px; height: 200px; display: block; position: absolute;top: 30%;left: 50%;transform: translateX(-50%);}
</style>

