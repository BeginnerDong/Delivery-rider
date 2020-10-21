<template>
	<div>
		<div class="pdlr4 pr">
			<div class="pdtb10 bordB1">
				<div class="flex Toptit"><img class="icon" src="static/images/details-icon.png" >物品信息</div>
				<div class="fx_lableBtn">外卖送餐</div>
			</div>
			<div class="orederDetal">
				<ul>
					<div  v-if="mainData.type==6">
						<li class="flexRowBetween fs13 msgLis"
						v-for="(item,index) in mainData.child[0]">
							<p class="tit avoidOverflow">{{item.title}}</p>
							<p class="specs flexEnd">
								<span class="num">×{{item.count}}</span>
								<span class="mny">￥{{item.unit_price}}</span>
							</p>
						</li>
						<li class="flexRowBetween fs13 msgLis"
						>
							<p class="tit avoidOverflow">餐盒费</p>
							<p class="specs flexEnd">
								<span class="num"></span>
								<span class="mny">￥{{mainData.packing_price}}</span>
							</p>
						</li>
					</div>
					<div v-if="mainData.type==5">
						<li class="flexRowBetween fs13 msgLis" >
							<p class="tit avoidOverflow">{{mainData.title}}</p>
							<p class="specs flexEnd">
								<span class="num">×{{mainData.count}}</span>
								<span class="mny">￥{{mainData.main_price}}</span>
							</p>
						</li>
						<li class="flexRowBetween fs13 msgLis"
						>
							<p class="tit avoidOverflow">餐盒费</p>
							<p class="specs flexEnd">
								<span class="num"></span>
								<span class="mny">￥{{mainData.packing_price}}</span>
							</p>
						</li>
						
					</div>
					
					<li class="flexEnd red">
						合计<span class="price">{{mainData.shopPrice}}</span>
					</li>
				</ul>
			</div>
		</div>
		<div class="f5H5"></div>
		<div class="pdlr4">
			<div class="pdtb10 bordB1">
				<div class="flex Toptit"><img class="icon" src="static/images/details-icon4.png">位置信息</div>
			</div>
			<div class="fs13 GprsMsg pdtb10 bordB1">
				<div class="item flexRowBetween mgb10">
					<p class="adrs flex"><em class="dian"></em>{{mainData.start_site}}</p>
					<span class="flexEnd" @click="openMap(mainData.start_latitude,mainData.start_longitude)"><img class="Ricon" src="static/images/the_order_details-icon7.png"></span>
				</div>
				<div class="item flexRowBetween">
					<p class="adrs flex" @click="callPhone(mainData.start_phone)">商家&nbsp;{{mainData.start_phone}}</p>
					<span class="flexEnd"><img class="Ricon" src="static/images/the_order_details-icon8.png"></span>
				</div>
			</div>
			
			<div class="fs13 GprsMsg pdtb10">
				<div class="item flexRowBetween mgb10">
					<p class="adrs flex"><em class="dian red"></em>{{mainData.end_site}}</p>
					<span class="flexEnd" @click="openMap(mainData.end_latitude,mainData.end_longitude)"><img class="Ricon" src="static/images/the_order_details-icon7.png"></span>
				</div>
				<div class="item flexRowBetween">
					<p class="adrs flex">{{mainData.end_name}}&nbsp;{{mainData.end_phone}}</p>
					<span class="flexEnd"  @click="callPhone(mainData.end_phone)"><img class="Ricon" src="static/images/the_order_details-icon8.png"></span>
				</div>
			</div>
		</div>
		<div class="f5H5"></div>
		<div class="pdlr4">
			<div class="pdtb10 bordB1">
				<div class="flex Toptit"><img class="icon" src="static/images/details-icon1.png">备注信息</div>
			</div>
			<div class="pdtb10 fs13 color6">{{mainData.passage1}}</div>
		</div>
		<div class="f5H5"></div>
		<div class="pdlr4">
			<div class="pdtb10 bordB1">
				<div class="flex Toptit"><img class="icon" src="static/images/details-icon2.png">费用明细</div>
			</div>
			<div class="orederDetal">
				<ul>
					<li class="flexRowBetween fs13 msgLis color6" v-for="(item,index) in moneyMxDate">
						<p class="flex">{{item.title}}<em class="fs12 color9 mgl5">{{item.range}}</em></p>
						<p class="color3">{{item.price}}元</p>
					</li>
					<li class="flexEnd red">
						合计<span class="price">{{deliverFee}}</span>
					</li>
				</ul>
			</div>
		</div>
		<div class="f5H5"></div>
		<div class="pdlr4">
			<div class="pdtb10 bordB1">
				<div class="flex Toptit"><img class="icon" src="static/images/details-icon3.png">派送时间</div>
			</div>
			<div class="orederDetal">
				<ul>
					<li class="flexRowBetween fs13 msgLis color6">
						<p class="flex">派单时间</p>
						<p class="color3">{{mainData.create_time}}</p>
					</li>
					<li class="flexRowBetween fs13 msgLis color6">
						<p class="flex">截止时间</p>
						<p class="color3">{{mainData.start_time}}</p>
					</li>
				</ul>
			</div>
		</div>
		
		<div class="detal_b_bar submitbtn" @click="orderUpdate()" v-if="mainData.transport_status==1">
			<button class="btn">立即接单</button>
		</div>
		
		<div class="detal_b_bar submitbtn" @click="Utils.stopMultiClick(confirm)" v-if="mainData.transport_status==2">
			<button class="btn">确认送达</button>
		</div>
		
		<!-- 确认抢这单？ -->
		<div class="xieyiAlert" v-if="is_deltAlertShow">
			<div class="infor center radius5" style="padding:40px 30px;height: auto;">
				<div class="colseBtn"  @click="deltAlert" style="top: 10px;right: 10px;left:auto;">×</div>
				<div class="tit font16 pdb30">确认抢这一单</div>
				<div class="btnB flexRowBetween">
					<div @click="deltAlert">否</div>
					<div class="on">是</div>
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
				mainData:{},
				moneyMxDate:[
					
				],
				is_deltAlertShow:false,
				deliverFee:0,
				Utils:this.$Utils
			}
		},
		onLoad(options) {
			const self = this;
			self.id = options.id;
			self.$Utils.loadAll(['getMainData','getUserInfoData'], self);
		},
		methods: {
			
			callPhone(phone){
				const self = this;
				uni.makePhoneCall({
				    phoneNumber: phone
				});
			},
			
			openMap(latitude,longitude){
				const self = this;
				var newObject = self.$Utils.bMapTransQQMap(longitude,latitude)
				 uni.openLocation({
					latitude: parseFloat(newObject.lat),
					longitude: parseFloat(newObject.lng),
					success: function () {
						console.log('success');
					}
				});
			},
			
			getUserInfoData() {
				const self = this;
				console.log('852369')
				const postData = {};
				postData.searchItem = {
					thirdapp_id:2,
				};
				postData.tokenFuncName = 'getRiderToken';
				const callback = (res) => {
					if (res.solely_code == 100000 && res.info.data[0]) {
						self.userInfoData = res.info.data[0];
						
					} else {
						self.$Utils.showToast(res.msg, 'none')
					};
					self.$Utils.finishFunc('getUserInfoData');
				};
				self.$apis.userInfoGet(postData, callback);
			},
			
			confirm() {
				const self = this;
				uni.setStorageSync('canClick', false);
				var now = Date.parse(new Date())/1000;
				const postData = {};
				postData.tokenFuncName = 'getRiderToken';
				postData.searchItem = {
					id:self.mainData.id,
					user_type:0,
					thirdapp_id:self.mainData.thirdapp_id
				};
				postData.data = {
					transport_status:3,
					finish_time:now,
					thirdapp_id:self.mainData.thirdapp_id
				};
				const callback = (data) => {				
					if (data.solely_code == 100000) {
						uni.setStorageSync('canClick', true);
						setTimeout(function() {
							uni.navigateBack({
								delta:1
							})
						}, 1000);
					} else {
						uni.setStorageSync('canClick', true);
						self.$Utils.showToast(data.msg, 'none', 1000)
					}	
				};
				self.$apis.orderUpdate(postData, callback);
			},
			
			orderUpdate() {
				const self = this;
				
				const postData = {};
				postData.tokenFuncName = 'getRiderToken';
				postData.searchItem = {
					id:self.mainData.id,
					user_type:0,
					thirdapp_id:['in',[2,3]]
				};
				postData.data = {
					transport_status:2,
					rider_no:self.userInfoData.user_no,
					thirdapp_id:self.mainData.thirdapp_id
				};
				const callback = (data) => {				
					if (data.solely_code == 100000) {
						uni.setStorageSync('canClick', true);
						self.$Utils.showToast('接单成功', 'none')
						setTimeout(function() {
							uni.navigateBack({
								delta:1
							})
						}, 1000);
					} else {
						uni.setStorageSync('canClick', true);
						self.$Utils.showToast(data.msg, 'none', 1000)
					}	
				};
				self.$apis.orderUpdate(postData, callback);
			},
			
			deltAlert(){
				const self = this;
				self.is_deltAlertShow=!self.is_deltAlertShow;
			},
			
			getMainData() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getRiderToken';
				postData.searchItem = {
					id:self.id,
					user_type:0,
					thirdapp_id:3
				};
				var callback = function(res){
				    console.log('getMainData', res);
					if(res.info.data.length>0){
						self.mainData = res.info.data[0];
						self.mainData.shopPrice = parseFloat(self.mainData.main_price)+parseFloat(self.mainData.packing_price);
						if(parseFloat(self.mainData.distance_price)>0){
							
							self.moneyMxDate.push({title:'距离附加费',price:'￥'+self.mainData.distance_price})
						};
						if(parseFloat(self.mainData.night_price)>0){
							self.moneyMxDate.push({title:'夜间配送费',price:'￥'+self.mainData.night_price})
						};
						if(parseFloat(self.mainData.weather_price)>0){
							self.moneyMxDate.push({title:'恶劣天气附加费',price:'￥'+self.mainData.weather_price})
						};
						if(parseFloat(self.mainData.holiday_price)>0){
							self.moneyMxDate.push({title:'节假日附加费',price:'￥'+self.mainData.holiday_price})
						};
						if(parseFloat(self.mainData.rush_price)>0){
							self.moneyMxDate.push({title:'高峰时段附加费',price:'￥'+self.mainData.rush_price})
						};
						/* if(parseFloat(self.mainData.delivery_reduce)>0){
							self.moneyMxDate.push({title:'配送费减免',price:'-￥'+self.mainData.delivery_reduce})
						}; */
						if(parseFloat(self.mainData.gratuity)>0){
							self.moneyMxDate.push({title:'小费',price:'￥'+self.mainData.gratuity})
						};
						self.deliverFee = parseFloat(parseFloat(self.mainData.distance_price) + parseFloat(self.mainData.night_price)
						+parseFloat(self.mainData.weather_price) + parseFloat(self.mainData.holiday_price) +
						parseFloat(self.mainData.rush_price) + 
						parseFloat(self.mainData.gratuity)).toFixed(2)
						self.$Utils.finishFunc('getMainData');
					}      
				};
				self.$apis.orderGet(postData, callback);
			}
		},
	}
</script>

<style>
	@import "../../assets/style/public.css";
	@import "../../assets/style/orederDetal.css";
	@import "../../assets/style/agreeSel.css";
	page{padding-bottom: 90px;}

</style>

