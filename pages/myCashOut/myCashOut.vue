<template>
	<div>
		
		<div class="tixianBox radius10">
			<div class="addBtn bordB1">
				<a class="flexRowBetween bankmsg" @click="Router.navigateTo({route:{path:'/pages/myBankCard/myBankCard'}})">
					<div>到账银行卡</div>
					<div class="lft font12">
						中国银行
						<div class="color2 num">(2356)</div>
					</div>
					<div>
						<img class="arrow arrowR" src="../../static/images/icon.png" mode="" />
					</div>
				</a>
			</div>
		
			<div class="editMoney">
				<div class="tit">提现金额</div>
				<div class="input">
					<input type="number" value="" placeholder="请输入提现金额">
				</div>
				<div class="flexRowBetween fs12 color9">
					<div>可提现金额200元</div>
					<div class="fs14 pucolor">全部提现</div>
				</div>
				
				<div class="submitbtn" style="margin-top: 50px;">
					<button class="btn" type="submit">提现</button>
				</div>
			</div>
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
	page{background: #F5F5F5;}
	.tixianBox{margin:50px 4%;background: #fff; }
	.bankmsg .lft{ display: flex; width: 50%; justify-content: flex-start; align-items: center; font-size: 13px;color: #999;}
	.bankmsg .lft .num{ margin-left: 10px; font-size: 13px;}
	
	.addBtn{border-radius: 5px; }
	.addBtn a{width: 100%; display: flex; justify-content: space-between; align-items: center;padding: 15px 4%;box-sizing: border-box;}
	.addBtn .arrow{ margin-left: 10px;}
	
	.editMoney{padding: 15px;}
	.editMoney .tit{ font-size: 14px; line-height: 40px;}
	.editMoney .input{ display: flex; justify-content: flex-start;align-items: center; line-height: 40px; margin-bottom: 15px;border-bottom: 1px solid #e7e7e7;}
	.editMoney .input input::-webkit-input-placeholder {font-size: 14px; color: #999;}
	.editMoney .input input{ font-size: 16px; line-height: 40px; display: block; width: 80%; height: 40px; box-sizing: border-box;}
	
	.editMoney .input::before{content: "￥"; font-size: 20px; margin-right: 5px;}
</style>

