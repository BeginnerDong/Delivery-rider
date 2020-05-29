<template>
	<div>
		<div class="myExtendTop white center">
			<div class="yuan fs13 pdb5">共{{dayCount}}单</div>
			<div class="bigNum">{{moneyCount}}<em class="fs12">元</em></div>
		</div>
		<div class="jifenTwoNum flexRowBetween boxShaow radius5">
			<div class="item">
				<p class="pdb5 flexCenter">开始时间<img class="arrow" src="../../static/images/the_order-icon1.png"></p>
				<div class="num fs12">
					<!-- <picker mode="date" :value='start' @change="changeStartTime">
						{{start==''?'请选择':start}} 
					</picker> -->
					<dyDatePicker placeholder="请选择" :childValue="start" :minSelect="from_minSelect" :maxSelect="from_maxSelect"
					:iconshow="false" @getData="changeStartTime"></dyDatePicker>
				</div>
			</div>
			<div class="item">
				<p class="pdb5  flexCenter">结束时间<img class="arrow" src="../../static/images/the_order-icon1.png"></p>
				<div class="num fs12">
					<dyDatePicker placeholder="请选择" :childValue="end" :minSelect="to_minSelect" :maxSelect="to_maxSelect"
					:iconshow="false" @getData="changeEndTime"></dyDatePicker>
				</div>
			</div>
		</div>
		
		<div class="orderNav bordB1">
			<div class="tt" :class="current==1?'on':''" @click="change('1')">已完结</div>
			<div class="tt" :class="current==2?'on':''" @click="change('2')">已延期</div>
		</div>
		
		<div class="orderBetween">
			<div class="item flexRowBetween fs12 color6" @click="toDetail(item.type,item.id)" v-for="(item,index) in mainData" :key="index">
				<div class="left">
					<p class="color6 pdb5">订单编号：{{item.order_no}}</p>
					<p class="color9 tex2"><i class="icon"></i>{{item.end_site}}<!-- <em class="mgl5 fs12">4.5公里</em> --></p>
				</div>
				<div class="right">
					<p class="price pdb5">{{item.rider_income}}</p>
					<p class="color9" v-show="current==1">{{item.finish_time}}完成</p>
					<p class="color9"  v-show="current==2">延期5分钟</p>
				</div>
			</div>
		</div>
	</div>
</template>


<script>
	import dyDatePicker from '@/components/dy-Date/dy-Date.vue'
	export default {
		components: {
			dyDatePicker
		},
		data() {
			return {
				Router:this.$Router,
				showView: false,
				is_show:false,
				orderOkData:[{},{},{},{}],
				current:1,
				mainData:[],
				searchItem:{
					thirdapp_id:['in',[2,3]],
					transport_status:3,
					user_type:0
				},
				userInfoData:{},
				dayCount:0,
				end:'',
				start:'',
				from_minSelect: '1900/01/01',
				from_maxSelect: '2050/12/31',
				to_minSelect: '1900/01/01',
				to_maxSelect: '2050/12/31',
				moneyCount:0
			}
		},
		
		onLoad() {
			const self = this;
			self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
			self.searchItem.rider_no = uni.getStorageSync('riderInfo').user_no;
			var dayStart = new Date(new Date().setHours(0, 0, 0, 0)).getTime() / 1000;
			var nowTime = (new Date()).getTime() / 1000;
			self.searchItem.finish_time=['between',[dayStart,nowTime]];
			//self.$Utils.loadAll(['getMainData'], self);
		},
		
		onShow() {
			const self =  this;
			self.getUserInfoData();
			self.getMainData(true);
			//self.getDayData()
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
			
			toDetail(type,id){
				const self = this;
				if(type==1){
					self.Router.navigateTo({route:{path:'/pages/orderDetail_fetchDeliver/orderDetail_fetchDeliver?id='+id}})
				}else if(type==2){
					self.Router.navigateTo({route:{path:'/pages/orderDetail_Agency/orderDetail_Agency?id='+id}})
				}else if(type==3){
					self.Router.navigateTo({route:{path:'/pages/orderDetail_daimai/orderDetail_daimai?id='+id}})
				}else if(type==4){
					self.Router.navigateTo({route:{path:'/pages/orderDetail_sameDay/orderDetail_sameDay?id='+id}})
				}else if(type==5||type==6){
					self.Router.navigateTo({route:{path:'/pages/orderDetail_waimai/orderDetail_waimai?id='+id}})
				}
			},
			
			changeStartTime(e){
				const self = this;
				self.start = e;
				
				self.startTimestamp = self.$Utils.timeToTimestamp(self.start);
				if(self.startTimestamp&&self.endTimestamp){
					self.searchItem.finish_time = ['between',[self.startTimestamp,self.endTimestamp]];
					self.getMainData(true)
				};
			},
			
			changeEndTime(e){
				const self = this;
				self.end = e;
				
				self.endTimestamp = self.$Utils.timeToTimestamp(self.end);
				if(self.startTimestamp&&self.endTimestamp){
					self.searchItem.finish_time = ['between',[self.startTimestamp,self.endTimestamp]];
					self.getMainData(true)
				};
			},
			
			change(current) {
				const self = this;
				if(current!=self.current){
					self.current = current;
					if(self.current==1){
						self.searchItem.transport_status=3;
						delete self.searchItem.type
					}else if(self.current==2){
						self.searchItem.type=5;
						self.searchItem.transport_status=1;
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
			
			getDayData() {
				const self = this;
				const postData = {};
				var dayStart = new Date(new Date().setHours(0, 0, 0, 0)).getTime() / 1000;
				var nowTime = (new Date()).getTime() / 1000;
				postData.tokenFuncName = 'getRiderToken';
				postData.paginate = self.$Utils.cloneForm(self.paginate);
				postData.searchItem = self.$Utils.cloneForm(self.searchItem);
				postData.searchItem.finish_time=['between',[dayStart,nowTime]];
				const callback = (res) => {
					if (res) {
						self.dayCount = res.info.total;
						for (var i = 0; i < res.info.data.length; i++) {
							self.moneyCount += parseFloat(res.info.data[i].rider_income)
						}
						
					}
					self.$Utils.finishFunc('getDayData');
				};
				self.$apis.orderGet(postData, callback);
			},
			
			getMainData(isNew) {
				const self = this;
				if (isNew) {
					self.mainData = [];
					self.paginate = {
						count: 0,
						currentPage: 1,
						is_page: true,
						pagesize: 10
					}
				};
				const postData = {};
				postData.tokenFuncName = 'getRiderToken';
				postData.paginate = self.$Utils.cloneForm(self.paginate);
				postData.searchItem = self.$Utils.cloneForm(self.searchItem);
				
				postData.compute = {
				  moneyCount:[
					'sum',
					'rider_income',
					self.$Utils.cloneForm(self.searchItem)
				  ],  
				};
				
				
				const callback = (res) => {
					if (res.info.data.length > 0) {
						for (var i = 0; i < res.info.data.length; i++) {
							res.info.data[i].finish_time = self.$Utils.timeto(res.info.data[i].finish_time*1000,'ymd-hms')
						}
						self.mainData.push.apply(self.mainData, res.info.data);
						
					};
					self.dayCount = res.info.total;
					self.moneyCount = res.info.compute.moneyCount
					console.log('self.mainData', self.mainData)
					console.log('self.moneyCount', self.moneyCount)
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.orderGet(postData, callback);
			},
		},
	}
</script>

<style>
	@import "../../assets/style/public.css";
	@import "../../assets/style/orderNav.css";
	@import "../../assets/style/user.css";
	
</style>

