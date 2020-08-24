<template>
	<div>
		<div class="tixianBox radius10">
			<div class="addBtn bordB1" v-if="mainData.number">
				<a class="flexRowBetween bankmsg" 
				@click="Router.navigateTo({route:{path:'/pages/myBankCard/myBankCard'}})">
					<div>到账银行卡</div>
					<div class="lft font12">
						{{mainData.label&&mainData.label[0]?mainData.label[0].title:''}}
						<div class="color2 num">({{mainData.number}})</div>
					</div>
					<div>
						<image class="arrow arrowR" src="static/images/icon.png" mode=""></image>
					</div>
				</a>
			</div>
			
			<div class="addBtn bordB1" v-else>
				<a class="flexRowBetween bankmsg" @click="Router.navigateTo({route:{path:'/pages/myBankCard/myBankCard'}})">
					<div>到账银行卡</div>
					<div class="flexCenter">
						<text class="color3 font13">去添加</text>
						<image class="arrow arrowR" src="static/images/icon.png" mode=""></image>
					</div>
				</a>
			</div>
		
			<div class="editMoney">
				<div class="tit">提现金额</div>
				<div class="input">
					<input type="number" v-model="submitData.count" placeholder="请输入提现金额">
				</div>
				<div class="flexRowBetween fs12 color9">
					<div>可提现金额{{userInfoData.balance}}元</div>
					<div class="fs14 pucolor" @click="allCount">全部提现</div>
				</div>
				
				<div class="submitbtn" style="margin-top: 50px;">
					<button class="btn" type="submit"
					  @click="Utils.stopMultiClick(submit)">提现</button>
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
				Utils:this.$Utils,
				mainData:{},
				userInfoData:{},
				submitData:{
					count:''
				}
			}
		},
		
		onLoad(options) {
			const self = this;
			self.type = options.type;
			self.behavior = options.behavior;
			
			console.log('self.behavior',self.behavior)
			self.$Utils.loadAll(['getUserInfoData'], self);
		},
		
		onShow() {
			const self = this;
			self.$Utils.loadAll(['getMainData'], self);
		},
		
		methods: {
			
			allCount(){
				const self = this;
				self.submitData.count = self.userInfoData.balance
			},
			
			submit() {
				const self = this;
				uni.setStorageSync('canClick', false);
				if(!self.mainData.number){
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('请先绑定银行卡', 'none');
					return
				};
				const pass = self.$Utils.checkComplete(self.submitData);
				console.log('self.submitData',self.submitData)
				if (pass) {
					if(parseFloat(self.submitData.count)>parseFloat(self.userInfoData.balance)){
						uni.setStorageSync('canClick', true);
						self.$Utils.showToast('余额不足', 'none');
						return
					};
					if(parseFloat(self.submitData.count)<=0){
						uni.setStorageSync('canClick', true);
						self.$Utils.showToast('请输入正确的金额', 'none');
						return
					};
						self.flowLogAdd();
				} else {
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('请输入提现金额', 'none')
				};
			},
			
			flowLogAdd() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getRiderToken'
				postData.data = {
					count:-self.submitData.count,
					thirdapp_id:2,
					status:1,
					trade_info:'提现',
					type:2,
					account:1,
					behavior:self.behavior,
					withdraw:1,
					withdraw_status:0,
				};
				const callback = (data) => {				
					if (data.solely_code == 100000) {					
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
				self.$apis.flowLogAdd(postData, callback);
			},
			
			
			getUserInfoData() {
				const self = this;
				console.log('852369')
				const postData = {
					searchItem:{}
				};
				postData.tokenFuncName = 'getRiderToken';
				postData.searchItem.user_no = uni.getStorageSync('riderInfo').user_no
				const callback = (res) => {
					if (res.solely_code == 100000 && res.info.data[0]) {
						self.userInfoData = res.info.data[0]
					} else {
						self.$Utils.showToast(res.msg, 'none');
					};
					self.$Utils.finishFunc('getUserInfoData');
			
				};
				self.$apis.userInfoGet(postData, callback);
			},

			getMainData() {
				const self = this;
			
				const postData = {};
				
				postData.tokenFuncName = 'getRiderToken';
				
				postData.searchItem = {
					isdefault:1
				};
				postData.getAfter ={
					label:{			
						tableName:'Label',
						middleKey:'bank',
						key:'id',
						condition:'=',
						searchItem:{
							status:1,
						}
					}
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData = res.info.data[0];
						self.mainData.number = self.mainData.number.substr(self.mainData.number.length-4)			
					}
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.cardGet(postData, callback);
			},

		},
	};
</script>

<style>
	@import "../../assets/style/public.css";

	page{
		background: #f5f5f5;
	}
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
	.editMoney .input input{ font-size: 20px; line-height: 40px; display: block; width: 80%; height: 40px; box-sizing: border-box;}
	
	.editMoney .input::before{content: "￥"; font-size: 20px; margin-right: 5px;}
</style>	



