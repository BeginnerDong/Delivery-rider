<template>
	<div>
		
		<div class="pdlr4 pr">
			<div class="pdtb10 bordB1">
				<div class="flex Toptit"><img class="icon" src="../../static/images/details-icon.png" >代办类型</div>
				<div class="fx_lableBtn">代办</div>
			</div>
			<div class="orederDetal">
				<ul>
					<li class="fs13 msgLis color6">万能排队</li>
				</ul>
			</div>
		</div>
		
		<div class="f5H5"></div>
		<div class="pdlr4">
			<div class="pdtb10 bordB1">
				<div class="flex Toptit"><img class="icon" src="../../static/images/details-icon1.png">代办业务说明</div>
			</div>
			<div class="pdtb10 fs13 color6">备注信息备注信息备注信息备注信息备注信息备注信息</div>
		</div>
		<div class="f5H5"></div>
		
		<div class="pdlr4">
			<div class="pdtb10 bordB1">
				<div class="flex Toptit"><img class="icon" src="../../static/images/details-icon2.png">费用明细</div>
			</div>
			<div class="orederDetal">
				<ul>
					<li class="flexRowBetween fs13 msgLis color6" v-for="(item,index) in CostDate">
						<p class="flex">{{item.title}}<em class="fs12 color9 mgl5">{{item.range}}</em></p>
						<p class="color3">{{item.price}}元</p>
					</li>
					<li class="flexEnd red">
						合计<span class="price">20.0</span>
					</li>
				</ul>
			</div>
		</div>
		
		<div class="f5H5"></div>
		<div class="pdlr4">
			<div class="pdtb10 bordB1">
				<div class="flex Toptit"><img class="icon" src="../../static/images/details-icon3.png">时间</div>
			</div>
			<div class="orederDetal">
				<ul>
					<li class="flexRowBetween fs13 msgLis color6">
						<p class="flex">派单时间</p>
						<p class="color3">2019.10.25 11:00</p>
					</li>
					<li class="flexRowBetween fs13 msgLis color6">
						<p class="flex">开始时间</p>
						<p class="color3">2019.10.25 12:00</p>
					</li>
				</ul>
			</div>
		</div>
		
		<div class="detal_b_bar submitbtn">
			<button class="btn">立即接单</button>
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
				CostDate:[
					{title:'基础配送费',price:'5'},
					{title:'高峰时段费',price:'5'},
					{title:'节假日附加费',price:'5'},
					{title:'距离附加费',range:'3.9km',price:'5'}
				],
				is_deltAlertShow:false
			}
		},
		onLoad() {
			const self = this;
			// self.$Utils.loadAll(['getMainData'], self);
		},
		methods: {
			deltAlert(){
				const self = this;
				self.is_deltAlertShow=!self.is_deltAlertShow;
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
	@import "../../assets/style/orederDetal.css";
	@import "../../assets/style/agreeSel.css";
	
	page{padding-bottom: 90px;}
</style>

