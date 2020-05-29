<template>
	<div>
		
	
	
		<!-- 标题 -->
		<div class="T-head line50 center fs16 Tfix-head flexRowBetween T-head-Icon">
			<div class="" @click="homeNavShow"><img class="icon" src="../../static/images/index-icon2.png" ></div>
			<div class="Ticon1"><img class="icon" src="../../static/images/index-icon1.png" ></div>
		</div>
		<div class="h50"></div>
		
		<div class="orderNav boxShaow" style="top:80px">
			<div class="tt" :class="current==1?'on':''" @click="change('1')">新任务</div>
			<div class="tt" :class="current==2?'on':''" @click="change('2')">待送达</div>
		</div>
		
		<div class="orderList pdlr4" style="margin-top: 85px;"  v-if="userData.is_work==1">
			<ul>
				<!-- 外卖送餐 -->
				<li v-if="item.type==5||item.type==6" v-for="(item,index) in mainData" :key="index">
					<div class="datt flexRowBetween bordB1">
						<h1 class="left fs14" v-if="item.transport_status==1">剩余接单时间{{item.min}}分钟</h1>
						<h1 class="left fs14" v-if="item.transport_status==2">配送中</h1>
						<div class="price flexEnd"  @click="moneyMxShow(index)">{{item.rider_income}}<img class="arrowR" src="../../static/images/icon.png" alt=""> </div>
					</div>
					<a class="infor mglr4" :data-id="item.id"
					@click="Router.navigateTo({route:{path:'/pages/orderDetail_waimai/orderDetail_waimai?id='+$event.currentTarget.dataset.id}})">
						<div class="pdtb10 adrsTwo">
							<p class="flex line">
								<em class="fs12 color6 ftn range">{{item.distance_to_start}}km</em><em class="dian green"></em>
								<span class="adrsMs ftw">{{item.start_site}}</span>
							</p>
							<p class="flex line">
								<em class="fs12 color6 ftn range">{{item.total_distance}}km</em><em class="dian red"></em>
								<span class="adrsMs ftw">{{item.end_site}}</span>
							</p>
							<p class="flex line">
								<em class="fs12 color6 ftn range"></em><em class="dian"></em>
								<span class="adrsMs"><em class="labBtn fs12">外卖送餐</em></span>
							</p>
						</div>
						
						<div class="msg mglr10 pr radius5 fs12" v-if="item.type==5">
							<p class="child  flexRowBetween">
								<span class="tit avoidOverflow">{{item.title}}</span>
								<span class="num">×{{item.count}}</span>
								<span class="mny">￥{{item.price}}</span>
							</p>
						</div>
						<div class="msg mglr10 pr radius5 fs12" v-if="item.type==6">
							<p class="child  flexRowBetween" v-for="c_item in item.child[0]">
								<span class="tit avoidOverflow">{{c_item.title}}</span>
								<span class="num">×{{c_item.count}}</span>
								<span class="mny">￥{{c_item.unit_price}}</span>
							</p>
						</div>
					</a>
					
					<div class="submitbtn mgt20 pdlr4" v-if="item.transport_status==1">
						<button class="Wbtn" @click="deltAlert(index)">抢单</button>
					</div>
					<div class="submitbtn mgt20 pdlr4 flexEnd" v-if="item.transport_status==2">
						<button class="sdBtn" @click="confirm(index)">确认送达</button>
					</div>
				</li>
				
				<!-- 代买 -->
				<li v-for="(item,index) in mainData" :key="index" v-if="item.type!=5&&item.type!=6">
					<div class="datt flexRowBetween bordB1">
						<h1 class="left fs14" v-if="item.transport_status==1">剩余接单时间{{item.min}}分钟</h1>
						<h1 class="left fs14" v-if="item.transport_status==2">配送中</h1>
						<div class="price flexEnd" @click="moneyMxShow(index)">{{item.rider_income}}<img class="arrowR" src="../../static/images/icon.png" alt=""> </div>
					</div>
					<a class="infor mglr4" 
					@click="toDetail(item.type,item.id)">
						<div class="pdtb10 adrsTwo">
							<p class="flex line">
								<em class="fs12 color6 ftn range">{{item.distance_to_start}}km</em><em class="dian green"></em>
								<span class="adrsMs ftw">{{item.start_site}}</span>
							</p>
							<p class="flex line" v-if="item.type!=2">
								<em class="fs12 color6 ftn range">{{item.type!=3?item.total_distance:'0'}}km</em><em class="dian red"></em>
								<span class="adrsMs ftw">{{item.end_site}}</span>
							</p>
							<p class="flex line">
								<em class="fs12 color6 ftn range"></em><em class="dian"></em>
								<span class="adrsMs">
									<em class="labBtn fs12" v-if="item.type==1">取送件</em>
									<em class="labBtn fs12" v-if="item.type==2">代办</em>
									<em class="labBtn fs12" v-if="item.type==3">代买</em>
									<em class="labBtn fs12" v-if="item.type==4">当日达</em>
								</span>
							</p>
						</div>
					</a>
					<div class="pdlr4">
						<div class="beizhu mgb15" v-if="item.passage1!=''">{{item.passage1}}</div>
						<div class="submitbtn mgt20" v-if="item.transport_status==1">
							<button class="Wbtn" @click="deltAlert(index)">抢单</button>
						</div>
						<div class="submitbtn mgt20 pdlr4 flexEnd" v-if="item.transport_status==2">
							<button class="sdBtn" @click="confirm(index)">确认送达</button>
						</div>
					</div>
				</li>
				
			</ul>
		</div>
		<div class="orderList pdlr4" style="margin-top: 55px;text-align: center;" v-else>
			快去上班接单吧~
		</div>
		<!-- 费用明细弹框 -->
		<div class="black-bj" v-show="is_show"></div>
		<div class="fxmxShow" v-show="is_moneyMxShow">
			<div class="colseBtna" @click="moneyMxClose">×</div>
			<div class="center line40">费用明细</div>
			<div class="infor fs12 color6">
				<p class="flexRowBetween" v-for="(item,index) in moneyMxDate">
					<span>{{item.title}}<i class="color9 mgl10">{{item.range}}</i></span>
					<em class="red">{{item.price}}</em>
				</p>
			</div>
		</div>
		
		<!-- 确认抢这单？ -->
		<div class="xieyiAlert" v-if="is_deltAlertShow">
			<div class="infor center radius5" style="padding:40px 30px;height: auto;">
				<div class="colseBtn"  @click="deltAlertClose" >×</div>
				<div class="tit font16 pdb30">确认抢这一单</div>
				<div class="btnB flexRowBetween">
					<div @click="deltAlertClose">否</div>
					<div class="on" @click="orderUpdate()">是</div>
				</div>
			</div>
		</div>
		
		<!-- 送货成功 -->
		<div class="sd-success center white" v-show="is_sdSuccess">
			<div class="c5Rclose" @click="sdSuccessShow">×</div>
			<div class="pdt30">送货成功，辛苦了~</div>
			<div class="submitbtn mgt40">
				<button class="btn" type="button" style="width: 100px;height: 35px; line-height: 35px;" 
				@click="sdSuccessShow">确定</button>
			</div>
		</div>
		
		
		<!-- 首页左侧菜单 -->
		<div class="left-homeNav" v-show="is_homeNav">
			<div class="nav-blackbj" @click="homeNavShow"></div>
			<div class="XlineNav" style="padding: 40px 15px;">
				<div class="info flexRowBetween">
					<div class="flex userInfor">
						<div class="userPhoto mgr15" style="overflow: hidden;" v-if="userData.info&&userData.info.mainImg&&userData.info.mainImg[0]">
							<img :src="userData.info.mainImg[0].url" >
						</div>
						<div class="userPhoto mgr15" style="overflow: hidden;" v-else>
							<img src="../../static/images/about-img.png" >
						</div>
						<div class="Msg">
							<p class="mgb5">{{userData.info?userData.info.name:''}}</p>
							<p class="fs13">{{userData.info?userData.info.phone:''}}</p>
						</div>
					</div>
					<a class="right pdtb10" style="width: 10%;" @click="Router.navigateTo({route:{path:'/pages/userInfor/userInfor'}})">
						<img class="arrowR" src="../../static/images/icon.png" >
					</a>
				</div>
				<div class="info flexRowBetween">
					<div class="flex">
						<img class="icon" src="../../static/images/about-icon1.png">
						<span class="tt">开启接单/关闭收工</span>
					</div>
					<div class="right">
						<switch @change="userUpdate" :checked="userData.is_work==1?true:false" style="transform:scale(0.75)"/>
					</div>
				</div>
				<div class="info">
					<a class="flexRowBetween" @click="Router.navigateTo({route:{path:'/pages/myOrder/myOrder'}})">
						<div class="flex">
							<img class="icon" src="../../static/images/about-icon3.png">
							<span class="tt">我的订单</span>
						</div>
						<div class="right">
							<img class="arrowR" src="../../static/images/icon.png" >
						</div>
					</a>
				</div>
				<div class="info">
					<a class="flexRowBetween" @click="Router.navigateTo({route:{path:'/pages/myIncome/myIncome'}})">
						<div class="flex">
							<img class="icon" src="../../static/images/about-icon4.png">
							<span class="tt">我的收入</span>
						</div>
						<div class="right">
							<img class="arrowR" src="../../static/images/icon.png" >
						</div>
					</a>
				</div>
				<div class="info">
					<a class="flexRowBetween"  @click="Router.navigateTo({route:{path:'/pages/myExtension/myExtension'}})">
						<div class="flex">
							<img class="icon" src="../../static/images/about-icon5.png">
							<span class="tt">我的推广</span>
						</div>
						<div class="right">
							<img class="arrowR" src="../../static/images/icon.png" >
						</div>
					</a>
				</div>
				<div class="info">
					<a class="flexRowBetween" @click="Router.navigateTo({route:{path:'/pages/myNotice/myNotice'}})">
						<div class="flex">
							<img class="icon" src="../../static/images/about-icon6.png">
							<span class="tt">通知中心</span>
						</div>
						<div class="right">
							<img class="arrowR" src="../../static/images/icon.png" >
						</div>
					</a>
				</div>
				
				<div class="submitbtn" style="margin-top: 80px;">
					<button class="btn flexCenter w" @click="loginOff">退出登录</button>
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
				current:1,
				is_moneyMxShow:false,
				moneyMxDate:[
					
				],
				is_deltAlertShow:false,
				is_sdSuccess:false,
				is_homeNav:false,
				searchItem:{
					thirdapp_id:['in',[2,3]],
					user_type:0,
					transport_status:1,
					level:0,
					pay_status:1
				},
				userData:{},
				willId:'',
				willIndex:-1
				
			}
		},
		
		onLoad() {
			const self = this;
			// self.$Utils.loadAll(['getMainData'], self);
		},
		
		onShow() {
			const self = this;
			self.$Utils.loadAll(['getUserInfoData'], self);
		},
		
		beforeDestroy() {
			const self = this;
			console.log(232)
			clearInterval(self.interval)
		},
		
		onUnload() {
			const self = this;
			console.log(232)
			clearInterval(self.interval)
		},
		
		onHide() {
			const self = this;
			console.log(232)
			clearInterval(self.interval)
		},
		
		
		
		
		methods: {
			
			loginOff(){
				const self = this;
				uni.showModal({
					title:'提示',
					content:'确认要退出登录吗',
					showCancel:true,
					success(res) {
						if(res.confirm){
							uni.removeStorageSync('riderToken');
							uni.removeStorageSync('riderInfo');
							uni.redirectTo({
							  url: '/pages/login/login'
							});
						}else{
							
						}
					}
				})
			},
			
			getLocation(){
				const self = this;
				uni.getLocation({
				    type: 'wgs84',
				    success: function (res) {
						console.log('222',res)
						self.melongitude = res.longitude;
						self.melatitude = res.latitude;
				        console.log('当前位置的经度：' + res.longitude);
				        console.log('当前位置的纬度：' + res.latitude);
						self.userInfoUpdate()
						self.interval = setInterval(function(){
						  self.getMainData(true)
						},10000)
						self.getMainData(true)
				    }
				});
				//self.$Utils.finishFunc('getLocation');
			},
			
			userInfoUpdate() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getRiderToken';
				postData.searchItem = {
					user_no:uni.getStorageSync('riderInfo').user_no
				};
				postData.data = {
					latitude:self.melatitude,
					longitude:self.melongitude
				};
				const callback = (data) => {				
					if (data.solely_code == 100000) {
						console.log('更新位置成功')
					} else {
						console.log('更新位置失败')
					}	
				};
				self.$apis.userInfoUpdate(postData, callback);
			},
			
			
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
				}
			},
			
			
			confirm(index) {
				const self = this;
				var now = Date.parse(new Date())/1000;
				const postData = {};
				postData.tokenFuncName = 'getRiderToken';
				postData.searchItem = {
					id:self.mainData[index].id,
					user_type:0,
					thirdapp_id:self.mainData[index].thirdapp_id
				};
				postData.data = {
					transport_status:3,
					finish_time:now,
					thirdapp_id:self.mainData[index].thirdapp_id
				};
				const callback = (data) => {				
					if (data.solely_code == 100000) {
						uni.setStorageSync('canClick', true);
						self.sdSuccessShow();
						setTimeout(function() {
							self.getMainData(true)
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
					id:self.willId,
					user_type:0,
					thirdapp_id:['in',[2,3]]
				};
				postData.data = {
					transport_status:2,
					rider_no:self.userData.user_no,
					thirdapp_id:self.mainData[self.willIndex].thirdapp_id
				};
				const callback = (data) => {				
					if (data.solely_code == 100000) {
						uni.setStorageSync('canClick', true);
						self.deltAlertClose();
						self.$Utils.showToast('接单成功', 'none')
						setTimeout(function() {
							self.getMainData(true)
						}, 1000);
					} else {
						uni.setStorageSync('canClick', true);
						self.$Utils.showToast(data.msg, 'none', 1000)
					}	
				};
				self.$apis.orderUpdate(postData, callback);
			},
			
			userUpdate(e) {
				const self = this;
				console.log('switch1 发生 change 事件，携带值为', e.target.value)
				const postData = {};
				postData.tokenFuncName = 'getRiderToken';
				postData.searchItem = {
					user_no:uni.getStorageSync('riderInfo').user_no
				};
				postData.data = {};
				if(e.target.value){
					postData.data.is_work = 1
				}else{
					postData.data.is_work = 0
				};
				const callback = (data) => {				
					if (data.solely_code == 100000) {
						uni.setStorageSync('canClick', true);
						self.is_homeNav = false;
						self.getUserInfoData()
					} else {
						uni.setStorageSync('canClick', true);
						self.$Utils.showToast(data.msg, 'none', 1000)
					}	
				};
				self.$apis.userUpdate(postData, callback);
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
						self.userData = res.info.data[0];
						if(self.userData.is_work==1){
							self.searchItem.city_id = self.userData.city_id;
							self.$Utils.finishFunc('getUserInfoData');
							self.getLocation()
						}else{
							clearInterval(self.interval)
							self.$Utils.finishFunc('getUserInfoData');
						}
					} else {
						self.$Utils.showToast(res.msg, 'none')
					};
				};
				self.$apis.userGet(postData, callback);
			},
			
			
			getMainData(isNew) {
				const self = this;
				
				
				var now = Date.parse(new Date())/1000;
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
				postData.latitude = parseFloat(self.melatitude);
				postData.longitude = parseFloat(self.melongitude);
				if(self.current==1){
					postData.searchItem.invalid_time = ['>',now];
				};
				const callback = (res) => {
					if(res.solely_code==100000){
						if (res.info.data.length > 0) {
							for (var i = 0; i < res.info.data.length; i++) {
								res.info.data[i].min = parseInt((parseInt(res.info.data[i].invalid_time) - parseInt(now))/60);
								res.info.data[i].distance_to_start = parseFloat(res.info.data[i].distance_to_start/1000).toFixed(2)
							};
							self.mainData.push.apply(self.mainData, res.info.data);
						};
					}else{
						self.$Utils.showToast(res.msg, 'none')
					};
					
					if(parseInt(res.info.total)>parseInt(uni.getStorageSync('number'))&&self.current==1){
						self.checkTotal()
					}
					uni.setStorageSync('number',res.info.total)
					self.$Utils.finishFunc('getUserInfoData');
				};
				self.$apis.orderGet(postData, callback);
			},
			
			checkTotal(){
				const self = this;
				self.$Utils.finishFunc('getUserInfoData');
				plus.push.createMessage("您有新的订单！");
			},
			
			change(current) {
				const self = this;
				if(current!=self.current){
					self.current = current;
					if(self.current==1){
						self.interval = setInterval(function(){
						  self.getMainData(true)
						},30000)
						delete self.searchItem.rider_no;
						self.searchItem.transport_status = 1;
					}else if(self.current==2){
						self.searchItem.transport_status = 2;
						self.searchItem.rider_no = uni.getStorageSync('riderInfo').user_no;
						clearInterval(self.interval)
						console.log(self.interval)
					};
					if(self.userData.is_work==1){
						self.getMainData(true)
					}
				}
			},
			
			moneyMxClose(){
				const self = this;
				self.moneyMxDate = [];
				self.is_show = !self.is_show
				self.is_moneyMxShow = !self.is_moneyMxShow
			},
			
			moneyMxShow(index){
				const self = this;
				if(self.mainData[index].type!=5&&self.mainData[index].type!=6){
					self.moneyMxDate.push({title:'基础配送费',price:'￥'+self.mainData[index].main_price});
				};
				
				/* if(parseFloat(self.mainData[index].packing_price)>0){
					self.moneyMxDate.push({title:'包装费',price:'￥'+self.mainData[index].packing_price})
				}; */
				if(parseFloat(self.mainData[index].distance_price)>0){
					self.moneyMxDate.push({title:'距离附加费',price:'￥'+self.mainData[index].distance_price})
				};
				if(parseFloat(self.mainData[index].weight_price)>0){
					self.moneyMxDate.push({title:'重量附加费',price:'￥'+self.mainData[index].weight_price})
				};
				if(parseFloat(self.mainData[index].night_price)>0){
					self.moneyMxDate.push({title:'夜间配送费',price:'￥'+self.mainData[index].night_price})
				};
				if(parseFloat(self.mainData[index].weather_price)>0){
					self.moneyMxDate.push({title:'恶劣天气附加费',price:'￥'+self.mainData[index].weather_price})
				};
				if(parseFloat(self.mainData[index].holiday_price)>0){
					self.moneyMxDate.push({title:'节假日附加费',price:'￥'+self.mainData[index].holiday_price})
				};
				if(parseFloat(self.mainData[index].rush_price)>0){
					self.moneyMxDate.push({title:'高峰时段附加费',price:'￥'+self.mainData[index].rush_price})
				};
				if(parseFloat(self.mainData[index].insured_price)>0){
					self.moneyMxDate.push({title:'保价费',price:'￥'+self.mainData[index].insured_price})
				};
				if(parseFloat(self.mainData[index].gratuity)>0){
					self.moneyMxDate.push({title:'小费',price:'￥'+self.mainData[index].gratuity})
				};
				/* if(parseFloat(self.mainData[index].delivery_reduce)>0){
					self.moneyMxDate.push({title:'配送费减免',price:'-￥'+self.mainData[index].delivery_reduce})
				}; */
				self.moneyMxDate.push({title:'总计',price:'￥'+self.mainData[index].price})
				self.is_show = !self.is_show
				self.is_moneyMxShow = !self.is_moneyMxShow
			},
			
			
			
			deltAlertClose(){
				const self = this;
				self.is_deltAlertShow = false;
			},
			
			deltAlert(index){
				const self = this;
				self.willId = self.mainData[index].id;
				self.willIndex = index;
				self.is_deltAlertShow=!self.is_deltAlertShow;
			},
			
			sdSuccessShow(){
				const self = this;
				self.is_sdSuccess=!self.is_sdSuccess;
			},
			
			homeNavShow(){
				const self = this;
				self.is_homeNav=!self.is_homeNav;
			},
			
		},
	}
</script>


<style>
	@import "../../assets/style/orderNav.css";
	@import "../../assets/style/public.css";
	@import "../../assets/style/index.css";
	@import "../../assets/style/agreeSel.css";
page{background: #F5F5F5;padding-bottom: 30px;}
.colseBtna{ position: absolute; top: 10px;right: 10px;transform: translateX(-50%); width: 20px; height: 20px; border-radius: 50%; font-size: 20px; color: #999; border:1px solid #999; line-height: 16px; text-align: center; }
.T-head-Icon{padding:40px 4% 0 4%; box-sizing: border-box;height: 80px;}
.T-head-Icon .icon{width: 20px; height: 20px; display: block;}
.orderNav{ position: fixed;top: 50px;left: 0; width: 100%;box-sizing: border-box;background: #fff; z-index: 5;border-bottom: 1px solid #eee;}
</style>

