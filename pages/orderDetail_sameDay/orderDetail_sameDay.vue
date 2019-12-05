<template>
	<div>
		<div class="pdlr4 pr">
			<div class="pdtb10 bordB1">
				<div class="flex Toptit"><img class="icon" src="../../static/images/details-icon.png">物品信息</div>
				<div class="fx_lableBtn">当日达</div>
			</div>
			<div class="orederDetal">
				<ul>
					<li class="fs13 msgLis color6">{{mainData.title}}、{{mainData.value}}、{{mainData.weight}}</li>
				</ul>
			</div>
		</div>
		<div class="f5H5" v-if="mainData.transport_status==1"></div>
		<div class="pdlr4" v-if="mainData.transport_status==1">
			<div class="pdtb10 bordB1">
				<div class="flex Toptit"><img class="icon" src="../../static/images/details-icon4.png">位置信息</div>
			</div>
			<div class="fs13 GprsMsg pdtb10 bordB1">
				<div class="item flexRowBetween mgb10">
					<p class="adrs flex"><em class="dian"></em>{{mainData.start_site}}</p>
					<span class="flexEnd"><img class="Ricon" src="../../static/images/the_order_details-icon7.png"></span>
				</div>
				<div class="item flexRowBetween">
					<p class="adrs flex">{{mainData.start_site}}&nbsp;15923014120</p>
					<span class="flexEnd"><img class="Ricon" src="../../static/images/the_order_details-icon8.png"></span>
				</div>
			</div>
			
			<div class="fs13 GprsMsg pdtb10">
				<div class="item flexRowBetween mgb10">
					<p class="adrs flex"><em class="dian"></em>{{mainData.end_site}}</p>
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
			<div class="pdtb10 fs13 color6">{{mainData.passage1}}</div>
		</div>
		<div class="f5H5"></div>
		
		<div class="pdlr4">
			<div class="pdtb10 bordB1">
				<div class="flex Toptit"><img class="icon" src="../../static/images/details-icon2.png">费用明细</div>
			</div>
			<div class="orederDetal">
				<ul>
					<li class="flexRowBetween fs13 msgLis color6" v-for="(item,index) in moneyMxDate">
						<p class="flex">{{item.title}}<em class="fs12 color9 mgl5">{{item.range}}</em></p>
						<p class="color3">{{item.price}}元</p>
					</li>
					<li class="flexRowBetween fs13 msgLis color6">
						<p>是否承担协商价格：</p>
						<p>
							<switch :checked="mainData.is_negotiate==1?true:false" disabled="true" style="transform:scale(0.75)"/>
						</p>
					</li>
					<li class="flexEnd red">
						合计<span class="price">{{mainData.price}}</span>
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
						<p class="color3">{{mainData.create_time}}</p>
					</li>
				</ul>
			</div>
		</div>
		
		<div class="detal_b_bar submitbtn" v-if="mainData.transport_status==0">
			<button class="btn">立即接单</button>
		</div>
		
		<div class="detal_b_bar submitbtn" v-if="mainData.transport_status==1">
			<button class="btn">确认送达</button>
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
				is_deltAlertShow:false
			}
		},
		onLoad(options) {
			const self = this;
			self.id = options.id;
			self.$Utils.loadAll(['getMainData'], self);
		},
		methods: {
			
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
					user_type:0
				};
				var callback = function(res){
				    console.log('getMainData', res);
					if(res.info.data.length>0){
						self.mainData = res.info.data[0];
						self.moneyMxDate.push({title:'愿意承担费用',price:'￥'+self.mainData.main_price});
						
						if(parseFloat(self.mainData.insured_price)>0){
							self.moneyMxDate.push({title:'保价费',price:'￥'+self.mainData.insured_price})
						};
						if(parseFloat(self.mainData.gratuity)>0){
							self.moneyMxDate.push({title:'小费',price:'￥'+self.mainData.gratuity})
						};
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

