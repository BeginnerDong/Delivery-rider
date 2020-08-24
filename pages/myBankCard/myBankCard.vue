<template>
	<div>
		<div class="pdlr4">
			<div class="myaddress-lis boxShaow radius10" v-for="(item,index) in mainData">
				<div class="flex" @click="choose(index)">
					<img class="bankIcon" :src="item.label&&item.label[0]&&item.label[0].mainImg&&item.label[0].mainImg[0]?item.label[0].mainImg[0].url:''">
					<div class="cont">
						<div class="adrs">{{item.label&&item.label[0]?item.label[0].title:''}}</div>
						<div class="name">**** **** **** {{item.number}}</div>
					</div>
				</div>
				<div class="seltBox">
					
					<div class="L" :data-id="item.id" @click="updateCard($event.currentTarget.dataset.id)">
						<img class="icon" :src="item.isdefault==1?'static/images/card-icon.png':'static/images/card-icon1.png'">
						默认银行卡
					</div>
					
					<div class="R fs12">
						<a class="child" :data-id="item.id" 
						@click="Router.navigateTo({route:{path:'/pages/myBankCard_add/myBankCard_add?id='+$event.currentTarget.dataset.id}})">
							<img  src="static/images/card-icon3.png" mode=""></image>编辑
						</a>
						<div class="child" :data-id="item.id" @click="deleteCard($event.currentTarget.dataset.id)">
							<img  src="static/images/card-icon2.png" mode=""></image>删除
						</div>
					</div>
				</div>
			</div>
			
			<div class="submitbtn" style="margin-top: 80px;">
				<button class="btn"  @click="Router.navigateTo({route:{path:'/pages/myBankCard_add/myBankCard_add'}})">添加银行卡</button>
			</div>

		</div>
	</div>
</template>


<script>
	export default {

		data() {
			return {
				mainData: [],
				Router:this.$Router,
				choosedIndex: -1
			}
		},

		onLoad(options) {
			const self = this;	
			
			
		},

		onReachBottom() {
			console.log('onReachBottom')
			const self = this;
			if (!self.isLoadAll && uni.getStorageSync('loadAllArray')) {
				self.paginate.currentPage++;
				self.getMainData()
			};
		},
		
		onShow() {
			const self = this;
			self.mainData = [];
			self.$Utils.loadAll(['getMainData'], self)
		},

		methods: {

			choose(index) {
				const self = this;
				self.choosedIndex = index;
				uni.setStorageSync('choosedAddressData', self.mainData[index]);
				console.log('choosedIndex', self.choosedIndex);
				uni.navigateBack({
					delta:1
				})
			},

			getMainData() {
				const self = this;

				const postData = {};
				postData.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
				postData.tokenFuncName = 'getRiderToken';
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
						self.mainData.push.apply(self.mainData, res.info.data);
						for (var i = 0; i < self.mainData.length; i++) {
							self.mainData[i].number = self.mainData[i].number.substr(self.mainData[i].number.length-4)
						}
					} else {
						self.$Utils.showToast('没有更多了', 'none');
					};
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.cardGet(postData, callback);
			},





			deleteCard(id) {
				const self = this;
				uni.showModal({
				    title: '提示',
				    content: '确认是否删除这张银行卡',
				    success: function (res) {
				        if (res.confirm) {
				            const postData = {};
				            postData.searchItem = {};
				            postData.searchItem.id = id;
				            postData.tokenFuncName = 'getRiderToken';
				            const callback = (res) => {
				            	if (res) {
				            		self.mainData = [];
				            		self.getMainData();
				            	}
				            };
				            self.$apis.cardDelete(postData, callback)
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});				
			},


			updateCard(id) {
				const self = this;
				const postData = {};

				postData.tokenFuncName = 'getRiderToken';

				postData.searchItem = {};
				postData.searchItem.id = id;
				postData.data = {
					isdefault: 1
				}
				const callback = (res) => {
					if (res.solely_code==100000) {
						self.mainData = [];
						self.getMainData();
					}else{
						self.$Utils.showToast(res.msg, 'none');
					}
				};
				self.$apis.cardUpdate(postData, callback);
			},




		}
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

