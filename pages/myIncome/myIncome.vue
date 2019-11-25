<template>
	<div>
		
		<div class="myExtendTop white center" style="padding-bottom: 30px;">
			<div class="bigNum pd10">566.9</div>
			<div class="yuan pdb20 fs13">收益(元)</div>
			<a class="txBtn" @click="Router.navigateTo({route:{path:'/pages/myCashOut/myCashOut'}})">提现</a>
		</div>
		
		<div class="orderNav bordB1">
			<div class="tt" :class="current==1?'on':''" @click="change('1')">外卖收入</div>
			<div class="tt" :class="current==2?'on':''" @click="change('2')">配送收入</div>
		</div>
		
		<div class="orderBetween" v-show="current==1">
			<div class="item" v-for="(item,index) in orderOkData" :key="index">
				<a class="flexRowBetween" @click="Router.navigateTo({route:{path:'/pages/orderDetailTwo_waimai/orderDetailTwo_waimai'}})">
					<div class="left color6">
						<p class="fs13">2019-10-26</p>
						<p class="fs12">订单编号：12345668885656</p>
					</div>
					<div class="right flexEnd">
						<p class="red">+￥5.2</p>
					</div>
				</a>
			</div>
		</div>
		<div class="orderBetween" v-show="current==2">
			<div class="item" v-for="(item,index) in orderOkData" :key="index">
				<a class="flexRowBetween" @click="Router.navigateTo({route:{path:'/pages/orderDetailTwo_sameDay/orderDetailTwo_sameDay'}})">
					<div class="left color6">
						<p class="fs13">2019-10-25</p>
						<p class="fs12">订单编号：15234562666556</p>
					</div>
					<div class="right flexEnd">
						<p class="red">+￥8.0</p>
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
				showView: false,
				is_show:false,
				orderOkData:[{},{},{},{}],
				current:1
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
	@import "../../assets/style/orderNav.css";
	@import "../../assets/style/user.css";
	
.sharebox{position: fixed; top: 0; right: 0; bottom: 0; left: 0;}
.sharebox .bigPic{width: 100%;  height: 100%; display: block;}
.sharebox .back-next{ display: block; left: 4%; top: 35px; font-size:14px;line-height: 22px;color: #666; font-weight: normal;}
.sharebox .back-next .icon{ width: 10px; height:18px; display: block;}
.sharebox .ewm{width: 80px; height: 80px; display: block; position: absolute;bottom: 30px;left: 50%;transform: translateX(-50%);}
</style>

