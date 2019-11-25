<template>
	<div>
		<!-- 标题 -->
		<div class="T-head line50 center fs16 Tfix-head">
			&nbsp;
		</div>
		<div class="h50 pubBj"></div>
		
		<div>
			<img style="width: 100%; height: auto; display: block;padding-bottom:40px;" src="../../static/images/registered-img.png" mode=""></img>
		</div>
		
		<div class="pub_editInfor pdlr4">
			<div class="item flexCenter">
				<div class="name"><img class="icon" src="../../static/images/registered-icon.png" ></div>
				<div class="rr bordB1">
					<input type="text" value="" placeholder="请输入手机号"/>
				</div>
			</div>
			<div class="item flexCenter">
				<div class="name"><img class="icon" src="../../static/images/registered-icon1.png" ></div>
				<div class="rr bordB1">
					<input type="text" value="" placeholder="请输入登录密码"/>
				</div>
			</div>
		</div>
		
		<div class="submitbtn" style="margin-top: 80px;">
			<div class="btn flexCenter w"  style="margin-bottom: 0;" @click="Router.navigateTo({route:{path:'/pages/index/index'}})">登录</div>
			<p style="margin: 5px 10%;"><a class="fs12 color6"  @click="Router.navigateTo({route:{path:'/pages/forgetPswd/forgetPswd'}})">忘记密码？</a></p>
		</div>
	</div>
</template>


<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				showView: false,
				is_show:false,
				mainData: []
			}
		},
		onLoad() {
			const self = this;
			// self.$Utils.loadAll(['getMainData'], self);
		},
		methods: {
			getMainData() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				var callback = function(res){
				    console.log('getMainData', res);
				    self.mainData.push.apply(self.mainData,res.info.data);		        
				};
				self.$apis.orderGet(postData, callback);
			}
		},
	}
</script>


<style>
	@import "../../assets/style/public.css";
	@import "../../assets/style/login.css";
	
</style>

