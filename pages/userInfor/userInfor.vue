<template>
	<div>
		<div class="userInfor pdlr4">
			<div class="item flexRowBetween">
				<div class="ll">头像：</div>
				<div class="rr flexEnd">
					<div class="userPhoto mgr15 oh"><img src="../../static/images/about-img.png" ></div>
				</div>
			</div>
			<div class="item flexRowBetween">
				<div class="ll">昵称：</div>
				<div class="rr flexEnd">
					<input type="text" name="" value="" placeholder="请输入昵称" />
				</div>
			</div>
			<div class="item flexRowBetween">
				<div class="ll">姓名：</div>
				<div class="rr flexEnd">
					<input type="text" name="" value="" placeholder="请输入您的姓名" />
				</div>
			</div>
			<div class="item flexRowBetween">
				<div class="ll">电话：</div>
				<div class="rr flexEnd">
					<input type="number" maxlength="11" name="" value="" placeholder="请输入您的电话" />
				</div>
			</div>
			<div class="item flexRowBetween">
				<div class="ll">验证码：</div>
				<div class="rr flexRowBetween">
					<div style="width: 40%;"><input type="text" name="" value="" placeholder="请输入验证码" style="text-align: left;" /></div>
					<div class="yzmBtn">获取验证码</div>
				</div>
			</div>
			
		</div>
		
		
		<div class="submitbtn" style="margin-top: 80px;">
			<button class="btn flexCenter w" >确定</button>
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
	
	.userPhoto{width:40px; height: 40px; border-radius: 50%; display: block;}
	.userPhoto img{width: 100%;height: 100%;display: block;}
	.userInfor .item{padding: 15px 0;border-bottom: 1px solid #eee;}
	.userInfor .ll{width: 18%;}
	.userInfor .rr{width: 82%;font-size: 13px;}
	.userInfor .rr input{width: 100%; display: block; font-size: 13px;text-align: right;}
	
</style>

