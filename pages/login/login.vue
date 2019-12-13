<template>
	<div v-if="showAll">
		<!-- 标题 -->
		<div class="T-head line50 center fs16 Tfix-head">
			&nbsp;
		</div>
		<div>
			<img style="width: 100%; height: 190px; display: block;padding-bottom:40px;" 
			src="../../static/images/registered-img.png" mode=""></img>
		</div>
		
		<div class="pub_editInfor pdlr4">
			<div class="item flexCenter">
				<div class="name"><img class="icon" src="../../static/images/registered-icon.png" ></div>
				<div class="rr bordB1">
					<input type="text" value="" placeholder="请输入手机号" v-model="submitData.login_name"/>
				</div>
			</div>
			<div class="item flexCenter">
				<div class="name"><img class="icon" src="../../static/images/registered-icon1.png" ></div>
				<div class="rr bordB1">
					<input type="text" value="" placeholder="请输入登录密码" v-model="submitData.password"/>
				</div>
			</div>
		</div>
		
		<div class="submitbtn" style="margin-top: 80px;">
			<div class="btn flexCenter w"  style="margin-bottom: 0;" @click="submit">登录</div>
			<p style="margin: 5px 10%;"><a class="fs12 color6"  @click="Router.navigateTo({route:{path:'/pages/forgetPswd/forgetPswd'}})">忘记密码？</a></p>
		</div>
	</div>
</template>


<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				submitData:{
					login_name:'',
					password:''
				},
				showAll:false
			}
		},
		
		onLoad(options) {
			const self = this;
			if (uni.getStorageSync('riderToken')) {
				uni.redirectTo({
					url: '/pages/index/index'
				})
			}else{
				self.showAll = true
			}
		},
		
		methods: {
			
			submit() {
				const self = this;
			
				const postData = {
					login_name: self.submitData.login_name,
					password:self.submitData.password
				};
				if (self.$Utils.checkComplete(self.submitData)) {
					
					const callback = (res) => {
						if (res.solely_code == 100000) {
							console.log(res);
							uni.setStorageSync('riderToken', res.token);
							uni.setStorageSync('riderInfo', res.info);
							uni.redirectTo({
								url: '/pages/index/index'
							}) 
						} else {
							self.$Utils.showToast(res.msg,'none')
						}
					}
					self.$apis.login(postData, callback);
				} else {
					self.$Utils.showToast('请补全登录信息', 'none')
				};
			},
			
		},
	};
</script>



<style>
	@import "../../assets/style/public.css";
	@import "../../assets/style/login.css";
	
</style>

