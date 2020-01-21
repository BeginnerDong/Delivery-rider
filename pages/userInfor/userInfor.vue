<template>
	<div>
		<div class="userInfor pdlr4">
			<div class="item flexRowBetween">
				<div class="ll">头像：</div>
				<div class="rr flexEnd" @click="upLoadImg" v-if="submitData.mainImg&&submitData.mainImg[0]">
					<div class="userPhoto mgr15 oh"><img :src="submitData.mainImg[0].url" ></div>
				</div>
				<div class="rr flexEnd" @click="upLoadImg" v-else>
					<div class="userPhoto mgr15 oh"><img src="../../static/images/about-img.png" ></div>
				</div>
			</div>
			<!-- <div class="item flexRowBetween">
				<div class="ll">昵称：</div>
				<div class="rr flexEnd">
					<input type="text" name="" value="" placeholder="请输入昵称" v-model="submitData.name"/>
				</div>
			</div> -->
			<div class="item flexRowBetween">
				<div class="ll">姓名：</div>
				<div class="rr flexEnd">
					<input type="text" name="" value="" placeholder="请输入您的姓名" v-model="submitData.name"/>
				</div>
			</div>
			<div class="item flexRowBetween">
				<div class="ll">电话：</div>
				<div class="rr flexEnd">
					<input type="number" maxlength="11" name="" value="" placeholder="请输入您的电话" v-model="submitData.phone"/>
				</div>
			</div>
			<!-- <div class="item flexRowBetween">
				<div class="ll">验证码：</div>
				<div class="rr flexRowBetween">
					<div style="width: 40%;"><input type="text" name="" value="" placeholder="请输入验证码" style="text-align: left;" /></div>
					<div class="yzmBtn">获取验证码</div>
				</div>
			</div> -->
			
		</div>
		
		
		<div class="submitbtn" style="margin-top: 80px;">
			<button class="btn flexCenter w" @click="Utils.stopMultiClick(submit)">确定</button>
		</div>
	</div>
</template>


<script>
	export default {
		
		data() {
			return {
				Router:this.$Router,
				Utils:this.$Utils,
				mainData: [],
				submitData:{
					name:'',
					phone:'',
					mainImg:[],
				}
			}
		},
		
		onLoad() {
			const self = this;
			self.$Utils.loadAll(['getMainData'], self);
		},
		
		methods: {
			
			upLoadImg(type) {
				const self = this;			
				uni.showLoading({
					mask: true,
					title: '上传中',
				});
				const callback = (res) => {
					console.log('res', res)
					if (res.solely_code == 100000) {
						self.submitData.mainImg = [];
						self.submitData.mainImg.push({url:res.info.url,type:'image'})
						console.log(self.submitData)
						uni.hideLoading()
					} else {
						self.$Utils.showToast('网络故障', 'none')
					}
				};				
				uni.chooseImage({
					count: 1,
					success: function(res) {
						console.log(res);
						var tempFilePaths = res.tempFilePaths[0];
						console.log(callback)
						self.$Utils.uploadFile(tempFilePaths, 'file', {
							tokenFuncName: 'getRiderToken',
							
						}, callback)
					},
					fail: function(err) {
						uni.hideLoading();
					},			
				})			
			},
			
			submit() {
				const self = this;
				
				uni.setStorageSync('canClick', false);
				const pass = self.$Utils.checkComplete(self.submitData);
				console.log('pass', pass);
				console.log('self.submitData',self.submitData)
				if (pass) {	
					self.userInfoUpdate();	
				} else {
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('请补全信息', 'none')
				};
			},
			
			userInfoUpdate() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getRiderToken';
				postData.searchItem = {
					user_no:uni.getStorageSync('riderInfo').user_no
				};
				postData.data = {};
				postData.data = self.$Utils.cloneForm(self.submitData);
				//postData.data.vip_time = Date.parse(new Date())/1000;
				if(self.mainData.level>3){
					postData.data.check_status = 1
				}
				const callback = (data) => {				
					if (data.solely_code == 100000) {
						uni.setStorageSync('canClick', true);
						self.$Utils.showToast('提交成功', 'none');
						
						setTimeout(function() {
							uni.navigateBack({
								delta:1
							})
						}, 800)
						
					} else {
						uni.setStorageSync('canClick', true);
						self.$Utils.showToast(data.msg, 'none', 1000)
					}	
				};
				self.$apis.userInfoUpdate(postData, callback);
			},
			
			getMainData() {
				const self = this;
				console.log('852369')
				const postData = {};
				postData.searchItem = {
					thirdapp_id:2,
				};
				postData.tokenFuncName = 'getRiderToken';
				const callback = (res) => {
					if (res.solely_code == 100000 && res.info.data[0]) {
						self.mainData = res.info.data[0];
						self.submitData.name = self.mainData.name;
						self.submitData.phone = self.mainData.phone;
						self.submitData.mainImg = self.mainData.mainImg;
					} else {
						self.$Utils.showToast(res.msg, 'none')
					};
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.userInfoGet(postData, callback);
			},
			
		},
	}
</script>


<style>
	@import "../../assets/style/public.css";
	
	.userPhoto{width:40px; height: 40px; border-radius: 50%; display: block;}
	.userPhoto img{width: 100%;height: 100%;display: block;}
	.userInfor .item{padding: 15px 0;border-bottom: 1px solid #eee;}
	.userInfor .ll{width: 18%;}
	.userInfor .rr{width: 82%;font-size: 13px;}
	.userInfor .rr input{width: 100%; display: block; font-size: 13px;text-align: right;}
	
</style>

