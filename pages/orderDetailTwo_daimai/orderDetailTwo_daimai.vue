<template>
	<div>
		<div class="pdlr4 pr">
			<div class="pdtb10 bordB1">
				<div class="flex Toptit"><img class="icon" src="../../static/images/details-icon.png" >物品信息</div>
				<div class="fx_lableBtn">代买</div>
			</div>
			<div class="orederDetal">
				<ul>
					<li class="fs13 msgLis color6">帮忙代买感冒药</li>
				</ul>
			</div>
		</div>
		
		<div class="f5H5"></div>
		<div class="pdlr4">
			<div class="pdtb10 bordB1">
				<div class="flex Toptit"><img class="icon" src="../../static/images/details-icon4.png">位置信息</div>
			</div>
			<div class="fs13 GprsMsg pdtb10 bordB1">
				<div class="item flexRowBetween mgb10">
					<p class="adrs flex"><em class="dian"></em>陕西省西安市雁塔区大都荟</p>
					<span class="flexEnd"><img class="Ricon" src="../../static/images/the_order_details-icon7.png"></span>
				</div>
				<div class="item flexRowBetween">
					<p class="adrs flex">张丹&nbsp;15923014120</p>
					<span class="flexEnd"><img class="Ricon" src="../../static/images/the_order_details-icon8.png"></span>
				</div>
			</div>
			<div class="fs13 GprsMsg pdtb10">
				<div class="item flexRowBetween mgb10">
					<p class="adrs flex"><em class="dian red"></em>陕西省西安市雁塔区大都荟</p>
					<span class="flexEnd"><img class="Ricon" src="../../static/images/the_order_details-icon7.png"></span>
				</div>
				<div class="item flexRowBetween">
					<p class="adrs flex">何洁&nbsp;15923014666</p>
					<span class="flexEnd"><img class="Ricon" src="../../static/images/the_order_details-icon8.png"></span>
				</div>
			</div>
		</div>
		
		<div class="f5H5"></div>
		<div class="pdlr4">
			<div class="pdtb10 bordB1">
				<div class="flex Toptit"><img class="icon" src="../../static/images/details-icon1.png">备注信息</div>
			</div>
			<div class="pdtb10 fs13 color6">备注信息备注信息备注信息备注信息备注信息备注信息</div>
		</div>
		<div class="f5H5"></div>
		<div class="pdlr4">
			<div class="pdtb10 bordB1">
				<div class="flex Toptit"><img class="icon" src="../../static/images/details-icon2.png">预估费用</div>
			</div>
			<div class="orederDetal">
				<ul>
					<li class="flexRowBetween fs13 color6">
						<p>预估费用</p>
						<p class="color3">50元</p>
					</li>
				</ul>
			</div>
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
				<div class="flex Toptit"><img class="icon" src="../../static/images/details-icon3.png">派送时间</div>
			</div>
			<div class="orederDetal">
				<ul>
					<li class="flexRowBetween fs13 msgLis color6">
						<p class="flex">派单时间</p>
						<p class="color3">2019.10.25 11:00</p>
					</li>
					<li class="flexRowBetween fs13 msgLis color6">
						<p class="flex">购买时间</p>
						<p class="color3">立即购买</p>
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

