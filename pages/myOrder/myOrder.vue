<template>
	<div>
		<div class="myExtendTop white center">
			<div class="yuan fs13 pdb5">今天共15单</div>
			<div class="bigNum">566.9<em class="fs12">元</em></div>
		</div>
		<div class="jifenTwoNum flexRowBetween boxShaow radius5">
			<div class="item">
				<p class="pdb5 flexCenter">开始时间<img class="arrow" src="../../static/images/the_order-icon1.png"></p>
				<div class="num fs12">2019.09.23</div>
			</div>
			<div class="item">
				<p class="pdb5  flexCenter">结束时间<img class="arrow" src="../../static/images/the_order-icon1.png"></p>
				<div class="num fs12">2019.10.23</div>
			</div>
		</div>
		
		<div class="orderNav bordB1">
			<div class="tt" :class="current==1?'on':''" @click="change('1')">已完结</div>
			<div class="tt" :class="current==2?'on':''" @click="change('2')">已延期</div>
		</div>
		
		<div class="orderBetween" v-show="current==1">
			<div class="item flexRowBetween fs12 color6" v-for="(item,index) in orderOkData" :key="index">
				<div class="left">
					<p class="color6 pdb5">订单编号：123455544558544</p>
					<p class="color9 tex2"><i class="icon"></i>西安赛瑞嘉来等大酒店(8楼826) <em class="mgl5 fs12">4.5公里</em></p>
				</div>
				<div class="right">
					<p class="price pdb5">5.2</p>
					<p class="color9">21:45完成</p>
				</div>
			</div>
		</div>
		<div class="orderBetween" v-show="current==2">
			<div class="item flexRowBetween fs12 color6" v-for="(item,index) in orderOkData" :key="index">
				<div class="left">
					<p class="color6 pdb5">订单编号：123455544558544</p>
					<p class="color9 tex2"><i class="icon"></i>西安赛瑞嘉来等大酒店(8楼826) <em class="mgl5 fs12">4.5公里</em></p>
				</div>
				<div class="right">
					<p class="price pdb5">5.2</p>
					<p class="color9">延期5分钟</p>
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
	
</style>

