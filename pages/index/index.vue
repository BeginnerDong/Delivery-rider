<template>
	<div>
		
	
	
		<!-- 标题 -->
		<div class="T-head line50 center fs16 Tfix-head flexRowBetween T-head-Icon">
			<div class="" @click="homeNavShow"><img class="icon" src="../../static/images/index-icon2.png" ></div>
			<div class="Ticon1"><img class="icon" src="../../static/images/index-icon1.png" ></div>
		</div>
		<div class="h50"></div>
		
		<div class="orderNav boxShaow">
			<div class="tt" :class="current==1?'on':''" @click="change('1')">新任务</div>
			<div class="tt" :class="current==2?'on':''" @click="change('2')">待送达</div>
		</div>
		
		<div class="orderList pdlr4" style="margin-top: 55px;" v-show="current==1">
			<ul>
				<!-- 外卖送餐 -->
				<li>
					<div class="datt flexRowBetween bordB1">
						<h1 class="left fs14">剩余接单时间5分钟</h1>
						<div class="price flexEnd"  @click="moneyMxShow">26<img class="arrowR" src="../../static/images/icon.png" alt=""> </div>
					</div>
					<a class="infor mglr4" @click="Router.navigateTo({route:{path:'/pages/orderDetail_waimai/orderDetail_waimai'}})">
						<div class="pdtb10 adrsTwo">
							<p class="flex line">
								<em class="fs12 color6 ftn range">2.9km</em><em class="dian green"></em>
								<span class="adrsMs ftw">海威大厦2903九牧宠物店</span>
							</p>
							<p class="flex line">
								<em class="fs12 color6 ftn range">2.9km</em><em class="dian red"></em>
								<span class="adrsMs ftw">海威大厦2903九牧宠物店</span>
							</p>
							<p class="flex line">
								<em class="fs12 color6 ftn range"></em><em class="dian"></em>
								<span class="adrsMs"><em class="labBtn fs12">外卖送餐</em></span>
							</p>
						</div>
						<div class="msg pr radius5 fs12">
							<p class="child  flexRowBetween">
								<span class="tit avoidOverflow">韩国泡菜</span>
								<span class="num">×1</span>
								<span class="mny">￥21.0</span>
							</p>
							<p class="child  flexRowBetween">
								<span class="tit avoidOverflow">牛肉土豆饼</span>
								<span class="num">×1</span>
								<span class="mny">￥4.0</span>
							</p>
						</div>
					</a>
					<div class="submitbtn mgt20 pdlr4">
						<button class="Wbtn" @click="deltAlert">抢单</button>
					</div>
				</li>
				
				<!-- 代买 -->
				<li>
					<div class="datt flexRowBetween bordB1">
						<h1 class="left fs14">剩余接单时间5分钟</h1>
						<div class="price flexEnd" @click="moneyMxShow">26<img class="arrowR" src="../../static/images/icon.png" alt=""> </div>
					</div>
					<a class="infor mglr4" @click="Router.navigateTo({route:{path:'/pages/orderDetail_daimai/orderDetail_daimai'}})">
						<div class="pdtb10 adrsTwo">
							<p class="flex line">
								<em class="fs12 color6 ftn range">2.9km</em><em class="dian green"></em>
								<span class="adrsMs ftw">海威大厦2903九牧宠物店</span>
							</p>
							<p class="flex line">
								<em class="fs12 color6 ftn range">2.9km</em><em class="dian red"></em>
								<span class="adrsMs ftw">海威大厦2903九牧宠物店</span>
							</p>
							<p class="flex line">
								<em class="fs12 color6 ftn range"></em><em class="dian"></em>
								<span class="adrsMs"><em class="labBtn fs12">代买</em></span>
							</p>
						</div>
					</a>
					<div class="pdlr4">
						<div class="beizhu mgb15">帮忙送狗粮</div>
						<div class="submitbtn mgt20">
							<button class="Wbtn" @click="deltAlert">抢单</button>
						</div>
					</div>
				</li>
				
				<!-- 当日达 -->
				<li>
					<div class="datt flexRowBetween bordB1">
						<h1 class="left fs14">剩余接单时间5分钟</h1>
						<div class="price flexEnd" @click="moneyMxShow">26<img class="arrowR" src="../../static/images/icon.png" alt=""> </div>
					</div>
					<a class="infor mglr4"  @click="Router.navigateTo({route:{path:'/pages/orderDetail_sameDay/orderDetail_sameDay'}})">
						<div class="pdtb10 adrsTwo">
							<p class="flex line">
								<em class="fs12 color6 ftn range">2.9km</em><em class="dian green"></em>
								<span class="adrsMs ftw">海威大厦2903九牧宠物店</span>
							</p>
							<p class="flex line">
								<em class="fs12 color6 ftn range">2.9km</em><em class="dian red"></em>
								<span class="adrsMs ftw">海威大厦2903九牧宠物店</span>
							</p>
							<p class="flex line">
								<em class="fs12 color6 ftn range"></em><em class="dian"></em>
								<span class="adrsMs"><em class="labBtn fs12">当日达</em></span>
							</p>
						</div>
					</a>
					<div class="pdlr4">
						<div class="beizhu mgb15">帮忙送狗粮</div>
						<div class="submitbtn mgt20">
							<button class="Wbtn" @click="deltAlert">抢单</button>
						</div>
					</div>
				</li>
				
				<!-- 取送件 -->
				<li>
					<div class="datt flexRowBetween bordB1">
						<h1 class="left fs14">剩余接单时间5分钟</h1>
						<div class="price flexEnd" @click="moneyMxShow">26<img class="arrowR" src="../../static/images/icon.png" alt=""> </div>
					</div>
					<a class="infor mglr4"  @click="Router.navigateTo({route:{path:'/pages/orderDetail_fetchDeliver/orderDetail_fetchDeliver'}})">
						<div class="pdtb10 adrsTwo">
							<p class="flex line">
								<em class="fs12 color6 ftn range">2.9km</em><em class="dian green"></em>
								<span class="adrsMs ftw">海威大厦2903九牧宠物店</span>
							</p>
							<p class="flex line">
								<em class="fs12 color6 ftn range">2.9km</em><em class="dian red"></em>
								<span class="adrsMs ftw">海威大厦2903九牧宠物店</span>
							</p>
							<p class="flex line">
								<em class="fs12 color6 ftn range"></em><em class="dian"></em>
								<span class="adrsMs"><em class="labBtn fs12">取送件</em></span>
							</p>
						</div>
					</a>
					<div class="pdlr4">
						<div class="beizhu mgb15">帮忙送狗粮</div>
						<div class="submitbtn mgt20">
							<button class="Wbtn" @click="deltAlert">抢单</button>
						</div>
					</div>
				</li>
				
				<!-- 代办 -->
				<li>
					<div class="datt flexRowBetween bordB1">
						<h1 class="left fs14">剩余接单时间5分钟</h1>
						<div class="price flexEnd" @click="moneyMxShow">26<img class="arrowR" src="../../static/images/icon.png" alt=""> </div>
					</div>
					<a class="infor mglr4"  @click="Router.navigateTo({route:{path:'/pages/orderDetail_Agency/orderDetail_Agency'}})">
						<div class="pdtb10 adrsTwo">
							<p class="flex line">
								<em class="fs12 color6 ftn range">2.9km</em><em class="dian red"></em>
								<span class="adrsMs ftw">海威大厦2903九牧宠物店</span>
							</p>
							<p class="flex line">
								<em class="fs12 color6 ftn range"></em><em class="dian"></em>
								<span class="adrsMs"><em class="labBtn fs12">代办</em></span>
							</p>
						</div>
					</a>
					<div class="pdlr4">
						<div class="beizhu mgb15">帮忙送狗粮</div>
						<div class="submitbtn mgt20">
							<button class="Wbtn" @click="deltAlert">抢单</button>
						</div>
					</div>
				</li>
			</ul>
		</div>
		
		<!-- 待送达内容 -->
		<div class="orderList pdlr4" style="margin-top: 55px;" v-show="current==2">
			<ul>
				<li>
					<div class="datt flexRowBetween bordB1">
						<h1 class="left fs14">剩余接单时间5分钟</h1>
						<div class="price flexEnd"  @click="moneyMxShow">26<img class="arrowR" src="../../static/images/icon.png" alt=""> </div>
					</div>
					<a class="infor mglr4" @click="Router.navigateTo({route:{path:'/pages/orderDetailTwo_waimai/orderDetailTwo_waimai'}})">
						<div class="pdtb10 adrsTwo">
							<p class="flex line">
								<em class="fs12 color6 ftn range">2.9km</em><em class="dian green"></em>
								<span class="adrsMs ftw">海威大厦2903九牧宠物店</span>
							</p>
							<p class="flex line">
								<em class="fs12 color6 ftn range">2.9km</em><em class="dian red"></em>
								<span class="adrsMs ftw">海威大厦2903九牧宠物店</span>
							</p>
							<p class="flex line">
								<em class="fs12 color6 ftn range"></em><em class="dian"></em>
								<span class="adrsMs"><em class="labBtn fs12">外卖送餐</em></span>
							</p>
						</div>
						<div class="msg pr radius5 fs12">
							<p class="child  flexRowBetween">
								<span class="tit avoidOverflow">韩国泡菜</span>
								<span class="num">×1</span>
								<span class="mny">￥21.0</span>
							</p>
							<p class="child  flexRowBetween">
								<span class="tit avoidOverflow">牛肉土豆饼</span>
								<span class="num">×1</span>
								<span class="mny">￥4.0</span>
							</p>
						</div>
					</a>
					<div class="submitbtn mgt20 pdlr4 flexEnd">
						<button class="sdBtn" @click="sdSuccessShow">确认送达</button>
					</div>
				</li>
				<li>
					<div class="datt flexRowBetween bordB1">
						<h1 class="left fs14">剩余接单时间5分钟</h1>
						<div class="price flexEnd" @click="moneyMxShow">26<img class="arrowR" src="../../static/images/icon.png" alt=""> </div>
					</div>
					<a class="infor mglr4"  @click="Router.navigateTo({route:{path:'/pages/orderDetailTwo_daimai/orderDetailTwo_daimai'}})">
						<div class="pdtb10 adrsTwo">
							<p class="flex line">
								<em class="fs12 color6 ftn range">2.9km</em><em class="dian green"></em>
								<span class="adrsMs ftw">海威大厦2903九牧宠物店</span>
							</p>
							<p class="flex line">
								<em class="fs12 color6 ftn range">2.9km</em><em class="dian red"></em>
								<span class="adrsMs ftw">海威大厦2903九牧宠物店</span>
							</p>
							<p class="flex line">
								<em class="fs12 color6 ftn range"></em><em class="dian"></em>
								<span class="adrsMs"><em class="labBtn fs12">代买</em></span>
							</p>
						</div>
					</a>
					<div class="pdlr4">
						<div class="beizhu mgb15">帮忙送狗粮</div>
						<div class="submitbtn mgt20 pdlr4 flexEnd">
							<button class="sdBtn" @click="sdSuccessShow">确认送达</button>
						</div>
					</div>
				</li>
				<li>
					<div class="datt flexRowBetween bordB1">
						<h1 class="left fs14">剩余接单时间5分钟</h1>
						<div class="price flexEnd" @click="moneyMxShow">26<img class="arrowR" src="../../static/images/icon.png" alt=""> </div>
					</div>
					<a class="infor mglr4" @click="Router.navigateTo({route:{path:'/pages/orderDetailTwo_sameDay/orderDetailTwo_sameDay'}})">
						<div class="pdtb10 adrsTwo">
							<p class="flex line">
								<em class="fs12 color6 ftn range">2.9km</em><em class="dian green"></em>
								<span class="adrsMs ftw">海威大厦2903九牧宠物店</span>
							</p>
							<p class="flex line">
								<em class="fs12 color6 ftn range">2.9km</em><em class="dian red"></em>
								<span class="adrsMs ftw">海威大厦2903九牧宠物店</span>
							</p>
							<p class="flex line">
								<em class="fs12 color6 ftn range"></em><em class="dian"></em>
								<span class="adrsMs"><em class="labBtn fs12">当日达</em></span>
							</p>
						</div>
					</a>
					<div class="pdlr4">
						<div class="beizhu mgb15">帮忙送狗粮</div>
						<div class="submitbtn mgt20 pdlr4 flexEnd">
							<button class="sdBtn" @click="sdSuccessShow">确认送达</button>
						</div>
					</div>
				</li>
				<li>
					<div class="datt flexRowBetween bordB1">
						<h1 class="left fs14">剩余接单时间5分钟</h1>
						<div class="price flexEnd" @click="moneyMxShow">26<img class="arrowR" src="../../static/images/icon.png" alt=""> </div>
					</div>
					<a class="infor mglr4"  @click="Router.navigateTo({route:{path:'/pages/orderDetailTwo_fetchDeliver/orderDetailTwo_fetchDeliver'}})">
						<div class="pdtb10 adrsTwo">
							<p class="flex line">
								<em class="fs12 color6 ftn range">2.9km</em><em class="dian green"></em>
								<span class="adrsMs ftw">海威大厦2903九牧宠物店</span>
							</p>
							<p class="flex line">
								<em class="fs12 color6 ftn range">2.9km</em><em class="dian red"></em>
								<span class="adrsMs ftw">海威大厦2903九牧宠物店</span>
							</p>
							<p class="flex line">
								<em class="fs12 color6 ftn range"></em><em class="dian"></em>
								<span class="adrsMs"><em class="labBtn fs12">取送件</em></span>
							</p>
						</div>
					</a>
					<div class="pdlr4">
						<div class="beizhu mgb15">帮忙送狗粮</div>
						<div class="submitbtn mgt20 pdlr4 flexEnd">
							<button class="sdBtn" @click="sdSuccessShow">确认送达</button>
						</div>
					</div>
				</li>
				<li>
					<div class="datt flexRowBetween bordB1">
						<h1 class="left fs14">剩余接单时间5分钟</h1>
						<div class="price flexEnd" @click="moneyMxShow">26<img class="arrowR" src="../../static/images/icon.png" alt=""> </div>
					</div>
					<a class="infor mglr4" @click="Router.navigateTo({route:{path:'/pages/orderDetailTwo_Agency/orderDetailTwo_Agency'}})">
						<div class="pdtb10 adrsTwo">
							<p class="flex line">
								<em class="fs12 color6 ftn range">2.9km</em><em class="dian red"></em>
								<span class="adrsMs ftw">海威大厦2903九牧宠物店</span>
							</p>
							<p class="flex line">
								<em class="fs12 color6 ftn range"></em><em class="dian"></em>
								<span class="adrsMs"><em class="labBtn fs12">代办</em></span>
							</p>
						</div>
					</a>
					<div class="pdlr4">
						<div class="beizhu mgb15">帮忙送狗粮</div>
						<div class="submitbtn mgt20 pdlr4 flexEnd">
							<button class="sdBtn" @click="sdSuccessShow">确认送达</button>
						</div>
					</div>
				</li>
			</ul>
		</div>
		
		<!-- 费用明细弹框 -->
		<div class="black-bj" v-show="is_show"></div>
		<div class="fxmxShow" v-show="is_moneyMxShow">
			<div class="colseBtn" @click="moneyMxShow">×</div>
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
				<div class="colseBtn"  @click="deltAlert" >×</div>
				<div class="tit font16 pdb30">确认抢这一单</div>
				<div class="btnB flexRowBetween">
					<div @click="deltAlert">否</div>
					<div class="on">是</div>
				</div>
			</div>
		</div>
		
		<!-- 送货成功 -->
		<div class="sd-success center white" v-show="is_sdSuccess">
			<div class="c5Rclose" @click="sdSuccessShow">×</div>
			<div class="pdt30">送货成功，辛苦了~</div>
			<div class="submitbtn mgt40">
				<button class="btn" type="button" style="width: 100px;height: 35px; line-height: 35px;" @click="sdSuccessShow">确定</button>
			</div>
		</div>
		
		
		<!-- 首页左侧菜单 -->
		<div class="left-homeNav" v-show="is_homeNav">
			<div class="nav-blackbj" @click="homeNavShow"></div>
			<div class="XlineNav">
				<div class="info flexRowBetween">
					<div class="flex userInfor">
						<div class="userPhoto mgr15"><img src="../../static/images/about-img.png" ></div>
						<div class="Msg">
							<p class="mgb5">设置昵称</p>
							<p class="fs13">15623562135</p>
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
						<switch checked="true" style="transform:scale(0.75)"/>
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
					{title:'基础配送费',price:'￥9'},
					{title:'距离附加',range:'2.9公里',price:'￥2.5'},
					{title:'重量附加',range:'3.0公斤',price:'￥5'},
					{title:'小费',price:'￥5'},
					{title:'总计',price:'￥21.5'}
				],
				is_deltAlertShow:false,
				is_sdSuccess:false,
				is_homeNav:false
			}
		},
		onLoad() {
			const self = this;
			// self.$Utils.loadAll(['getMainData'], self);
		},
		methods: {
			change(current) {
				const self = this;
				if(current!=self.current){
					self.current = current
				}
			},
			moneyMxShow(){
				const self = this;
				self.is_show = !self.is_show
				self.is_moneyMxShow = !self.is_moneyMxShow
			},
			deltAlert(){
				const self = this;
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
	@import "../../assets/style/orderNav.css";
	@import "../../assets/style/public.css";
	@import "../../assets/style/index.css";
	@import "../../assets/style/agreeSel.css";
page{background: #F5F5F5;padding-bottom: 30px;}
.T-head-Icon{padding: 15px 4%; box-sizing: border-box;}
.T-head-Icon .icon{width: 20px; height: 20px; display: block;}
.orderNav{ position: fixed;top: 50px;left: 0; width: 100%;box-sizing: border-box;background: #fff; z-index: 5;border-bottom: 1px solid #eee;}
</style>

