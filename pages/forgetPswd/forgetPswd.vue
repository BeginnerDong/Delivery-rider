<template>
	<div>
		<!-- 标题 -->
		<div class="T-head line50 center fs16 Tfix-head">
			<a class="back-next pa" href="javascript:history.go(-1);"><img class="icon" src="../../static/images/backIcon.png" ></a>
			忘记密码
		</div>
		<div class="h50"></div>
		
		<div>
			<img style="width: 100%; height: auto; display: block;padding-bottom:40px;" src="../../static/images/registered-img.png" mode=""></img>
		</div>
		
		<div class="pub_editInfor pdlr4 fs13">
			<div class="item flexCenter">
				<div class="name"><img class="icon" src="../../static/images/registered-icon.png" ></div>
				<div class="rr bordB1">
					<input type="number" value="" placeholder="请输入手机号"/>
				</div>
			</div>
			<div class="item flexCenter">
				<div class="name"><img class="icon" src="../../static/images/registered-icon2.png" ></div>
				<div class="rr bordB1 flexRowBetween">
					<input type="number" style="width: 50%;" value="" placeholder="请输入手机号"/>
					<span class="yzmBtn">获取验证码</span>
				</div>
			</div>
			<div class="item flexCenter">
				<div class="name"><img class="icon" src="../../static/images/registered-icon1.png" ></div>
				<div class="rr bordB1">
					<input type="text" value="" placeholder="请输入登录密码"/>
				</div>
			</div>
			<div class="item flexCenter">
				<div class="name"><img class="icon" src="../../static/images/registered-icon1.png" ></div>
				<div class="rr bordB1">
					<input type="text" value="" placeholder="再次输入登录密码"/>
				</div>
			</div>
		</div>
		
		<div class="submitbtn" style="margin-top: 50px;">
			<button class="btn" style="button"  @click="Router.navigateTo({route:{path:'/pages/login/login'}})">确定</button>
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

