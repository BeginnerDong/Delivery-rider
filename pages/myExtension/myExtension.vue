<template>
	<div>
		<div class="myExtendTop white center" style="padding-bottom: 30px;">
			<div class="bigNum pd10">566.9<em class="fs12">元</em></div>
			<div class="yuan pdb20 fs13">奖励余额</div>
			<a class="txBtn" @click="Router.navigateTo({route:{path:'/pages/myCashOut/myCashOut'}})">提现</a>
		</div>
		<div class="orderBetween" >
			<div class="item flexRowBetween" v-for="(item,index) in orderOkData" :key="index">
				<div class="left color6 flex">
					<div><img class="photo" src="../../static/images/promote-icon.png" ></div>
					<div class="photoName">
						<p class="fs13">快乐的猫</p>
						<p class="fs12">2019-10-26</p>
					</div>
				</div>
				<div class="right flexEnd">
					<p class="red">+￥5.2</p>
				</div>
			</div>
		</div>
		
		<!-- YOUCE -->
		<div class="fabubtn">
			<a class="white" @click="Router.navigateTo({route:{path:'/pages/myExtension_share/myExtension_share'}})">分享</a>
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
				orderOkData:[{},{},{}],
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
	
.fabubtn{ width:50px; height: 50px; line-height: 50px;border-radius: 50%;background: url(../../static/images/promote-icon1.png) no-repeat 0 0/100% 100%;text-align: center; position: fixed; bottom: 20%;right: 10px; z-index: 66;box-shadow: 0 0 5px rgba(0,0,0,0.2);}
.fabubtn a{width: 100%;line-height: 50px; display: block;}
</style>

