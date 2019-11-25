<template>
	<div>
		<div class="pdlr4">
			<div class="myaddress-lis boxShaow radius10" v-for="(item,index) in myBankData">
				<div class="flex">
					<img class="bankIcon" src="../../static/images/bank_icon1.png" >
					<div class="cont">
						<div class="adrs">中国银行 <text class="color3 font12">对公</text></div>
						<div class="name">**** **** **** 2356</div>
					</div>
				</div>
				<div class="seltBox">
					<div class="L" @click="change(index)">
						<img class="icon" :src="curr==index?'../../static/images/card-icon.png':'../../static/images/card-icon1.png'">
						默认银行卡
					</div>
					<div class="R fs12">
						<div class="child" @click="Router.navigateTo({route:{path:'/pages/myBankCard_edit/myBankCard_edit'}})"><img src="../../static/images/card-icon3.png" mode="" />编辑</div>
						<div class="child" @click="deltAlert"><img src="../../static/images/card-icon2.png" mode="" />删除</div>
					</div>
				</div>
			</div>
			
			<div class="submitbtn" style="margin-top: 80px;">
				<button class="btn"  @click="Router.navigateTo({route:{path:'/pages/myBankCard_add/myBankCard_add'}})">添加银行卡</button>
			</div>
			
			<div class="xieyiAlert" v-if="is_show">
				<div class="infor center radius5" style="padding:40px 30px;height: auto;">
					<div class="colseBtn"  @click="deltAlert" style="top: 10px;right: 10px;left:auto;">×</div>
					<div class="tit font16 pdb30">确定是否删除这张银行卡</div>
					<div class="btnB flexRowBetween">
						<div class="on">是</div>
						<div @click="deltAlert">否</div>
					</div>
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
				mainData: [],
				myBankData:[{},{}],
				curr:0
			}
		},
		onLoad() {
			const self = this;
			// self.$Utils.loadAll(['getMainData'], self);
		},
		methods: {
			hange(index){
				const self = this;	
				   self.curr = index
			},
			deltAlert(){
				const self = this;
				self.is_show=!self.is_show;
			},
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
	@import "../../assets/style/agreeSel.css";
	.myaddress-lis{padding:15px;margin-bottom: 10px;background: #fff; margin-bottom: 15px;border-radius: 5px; margin-top: 15px;}
	.myaddress-lis .name{  color: #222;padding:5px 0;}
	.myaddress-lis .adrs{ font-size: 13px;color: #999; line-height: 20px;}
	.seltBox{ display: flex;justify-content: space-between; align-items: center;padding-top: 5px;}
	.seltBox .L{ width: 30%; display: flex; align-items: center; font-size: 12px; color: #999;}
	.seltBox .L .icon{ width: 15px; height: 15px; display: inline-block; margin-right: 5px;}
	.seltBox .R{display: flex; align-items: center; width: 70%; justify-content: flex-end;}
	.seltBox .R .child{margin-left: 15px; display: flex; justify-content: flex-end; font-size: 12px; color: #999; align-items: center;}
	.seltBox .R img{  width:15px; height: 15px; display:block; margin-right: 4px;}
	
	.bankIcon{width:35px ; height: 35px; display: block; margin-right: 10px;}
	
	.btnB{ width: 60%;margin: 0 auto;}
	.btnB div{width: 50px; line-height: 25px; height: 25px;border-radius: 15px;border:1px solid #626262;}
	.btnB div.on{background: #2FA0ED;color: #fff;border-color: #2FA0ED;}
</style>

