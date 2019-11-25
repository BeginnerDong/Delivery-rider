<template>
	<div>
		<!-- 标题 -->
		
		<div class="bankInfor">
			<ul>
				<li class="flexRowBetween">
					<div class="name fs13">银行卡开户名：</div>
					<div class="right flexEnd">
						<input type="text" value="" placeholder="请输入银行卡开户名">
					</div>
				</li>
				<li class="flexRowBetween">
					<div class="name fs13">选择银行：</div>
					<div class="right flexEnd">
						<select>
							<option value ="请选择">请选择</option>
							<option value ="">中国银行</option>
							<option value ="">西安银行</option>
							<option value ="">交通银行</option>
						</select>
					</div>
				</li>
				<li class="flexRowBetween">
					<div class="name fs13">银行卡卡号：</div>
					<div class="right flexEnd">
						<input type="number" value="" placeholder="请输入银行卡卡号" onkeyup="this.value=this.value.replace(/\D/g,'')"  maxlength="11">
					</div>
				</li>
				<li class="flexRowBetween">
					<div class="name fs13">手机号：</div>
					<div class="right flexEnd">
						<input type="number" value="" placeholder="请输入您银行卡绑定的手机号" onkeyup="this.value=this.value.replace(/\D/g,'')"  maxlength="11">
					</div>
				</li>
			</ul>
		</div>
		
		<div class="submitbtn" style="margin-top: 100px;">
			<button class="btn" href="#">保存</button>
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
	@import "../../assets/style/bankInfor.css";
</style>

