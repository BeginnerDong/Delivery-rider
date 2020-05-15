<template>
	<div>
		
		<div class="myExtendTop white center" style="padding-bottom: 30px;">
			<div class="bigNum pd10">{{userInfoData.balance}}</div>
			<div class="yuan pdb20 fs13">可提现金额(元)</div>
			<a class="txBtn" @click="goCash()">提现</a>
		</div>
		
		<div class="orderNav bordB1">
			<div class="tt" :class="current==1?'on':''" @click="change('1')">外卖收入</div>
			<div class="tt" :class="current==2?'on':''" @click="change('2')">配送收入</div>
		</div>
		
		<div class="orderBetween">
			<div class="item" v-for="(item,index) in mainData" :key="index">
				<a class="flexRowBetween">
					<div class="left color6">
						<p class="fs13">{{item.create_time}}</p>
						<p class="fs12">订单编号：{{item.order_no}}</p>
					</div>
					<div class="right flexEnd">
						<p class="red">{{item.count}}</p>
					</div>
				</a>
			</div>
		</div>
	</div>
</template>


<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				rewardData:[
					{},{},{}
				],
				searchItem:{
					type:2,
					status:['in',[0,1]],
					behavior:1,
					withdraw:0,
					count:['>',0]
				},
				userInfoData:{},
				mainData:[],
				paginate:{
					count: 0,
					currentPage: 1,
					pagesize: 10,
					is_page: true,
				},
				current:1,
				allCount:0
			}
		},
		
		onLoad(options) {
			const self = this;
			self.paginate = self.$Utils.cloneForm(self.paginate);
			//self.$Utils.loadAll(['getMainData'], self)
		
		},
			
		onShow() {
			const self =  this;
			self.getUserInfoData();
			self.getMainData(true);
		},
		
		onReachBottom() {
			console.log('onReachBottom')
			const self = this;
			if (!self.isLoadAll && uni.getStorageSync('loadAllArray')) {
				self.paginate.currentPage++;
				self.getMainData()
			};
		},
		
		methods: {
			
			goCash(){
				const self = this;
				if(self.current==1){
					self.Router.navigateTo({route:{path:'/pages/myCashOut/myCashOut?behavior=1'}})
				}else if(self.current==2){
					self.Router.navigateTo({route:{path:'/pages/myCashOut/myCashOut?behavior=0'}})
				}
			},
			
			change(current) {
				const self = this;
				if(current!=self.current){
					self.current = current;
					if(self.current==1){
						self.searchItem.behavior=1;
						
					}else if(self.current==2){
						self.searchItem.behavior=0;
					}
					self.getMainData(true)
				}
			},
			
			getUserInfoData() {
				const self = this;
				console.log('852369')
				const postData = {
					searchItem:{}
				};
				postData.tokenFuncName = 'getRiderToken'
				postData.searchItem.user_no = uni.getStorageSync('riderInfo').user_no		
				
				const callback = (res) => {
					if (res.solely_code == 100000 && res.info.data[0]) {
						self.userInfoData = res.info.data[0];
					} else {
						self.$Utils.showToast(res.msg, 'none')
					};
				};
				self.$apis.userInfoGet(postData, callback);
			},
			
			getMainData(isNew) {
				const self = this;
				if (isNew) {
					self.mainData = [];
					self.paginate = {
						count: 0,
						currentPage: 1,
						pagesize: 10,
						is_page: true,
					};
				};
				const postData = {};
				postData.paginate = self.$Utils.cloneForm(self.paginate);
				postData.searchItem = self.$Utils.cloneForm(self.searchItem);
				postData.tokenFuncName = 'getRiderToken';
				postData.compute = {
				  all:[
					'sum',
					'count',
					self.$Utils.cloneForm(self.searchItem)
				  ],
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData.push.apply(self.mainData, res.info.data);
					}
					self.allCount = res.info.compute.all
					console.log(self.mainData)
				};
				self.$apis.flowLogGet(postData, callback);
			},

		},
	};
</script>

<style>
	@import "../../assets/style/public.css";
	@import "../../assets/style/orderNav.css";
	@import "../../assets/style/user.css";
	
.sharebox{position: fixed; top: 0; right: 0; bottom: 0; left: 0;}
.sharebox .bigPic{width: 100%;  height: 100%; display: block;}
.sharebox .back-next{ display: block; left: 4%; top: 35px; font-size:14px;line-height: 22px;color: #666; font-weight: normal;}
.sharebox .back-next .icon{ width: 10px; height:18px; display: block;}
.sharebox .ewm{width: 80px; height: 80px; display: block; position: absolute;bottom: 30px;left: 50%;transform: translateX(-50%);}
</style>

