<template>
	<div>
		
		<div class="sharebox">
			<a class="back-next pa" href="javascript:history.go(-1);"><img class="icon" src="../../static/images/backIcon.png" ></a>
			<img class="bigPic" src="../../static/images/img.png" >
			<img class="ewm" :src="userInfoData.qrCode" >
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
.sharebox .ewm{width: 80px; height: 80px; display: block; position: absolute;bottom: 30px;left: 50%;transform: translateX(-50%);}
</style>

