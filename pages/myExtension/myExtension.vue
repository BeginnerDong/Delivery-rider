<template>
	<div>
		<div class="myExtendTop white center" style="padding-bottom: 30px;">
			<div class="bigNum pd10">{{allCount}}<em class="fs12">元</em></div>
			<div class="yuan pdb20 fs13">奖励余额</div>
			<a class="txBtn" @click="Router.navigateTo({route:{path:'/pages/myCashOut/myCashOut?behavior=2&money='+allCount}})">提现</a>
		</div>
		<div class="orderBetween">
			<div class="item flexRowBetween" v-for="(item,index) in mainData" :key="index">
				<div class="left color6 flex">
					<!-- <div><img class="photo" src="static/images/promote-icon.png" ></div> -->
					<div class="photoName">
						<p class="fs13">{{item.trade_info}}</p>
						<p class="fs12">{{item.create_time}}</p>
					</div>
				</div>
				<div class="right flexEnd">
					<p class="red">{{item.count}}</p>
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
				Router: this.$Router,
				showView: false,
				is_show: false,

				orderOkData: [{}, {}, {}],
				current: 1,
				searchItem: {
					type: 2,
					status: ['in', [0, 1]],
					behavior: 2,
					withdraw:0,
				},
				userInfoData: {},
				mainData: [],
				paginate: {
					count: 0,
					currentPage: 1,
					pagesize: 10,
					is_page: true,
				},
				allCount: 0
			}
		},

		onLoad(options) {
			const self = this;
			self.paginate = self.$Utils.cloneForm(self.paginate);
			//self.$Utils.loadAll(['getMainData'], self)

		},

		onShow() {
			const self = this;
			self.getUserInfoData();
			self.getMainData(true);
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
			getUserInfoData() {
				const self = this;
				console.log('852369')
				const postData = {
					searchItem: {}
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

			getMainData(isNew) {
				const self = this;
				if (isNew) {
					self.mainData = [];
					self.paginate = {
						count: 0,
						currentPage: 1,
						pagesize: 10,
						is_page: true,
					};
				};
				const postData = {};
				postData.paginate = self.$Utils.cloneForm(self.paginate);
				postData.searchItem = self.$Utils.cloneForm(self.searchItem);
				postData.tokenFuncName = 'getRiderToken';
				postData.compute = {
					all: [
						'sum',
						'count',
						{type: 2,status: ['in', [0, 1]],behavior: 2,user_no:uni.getStorageSync('riderInfo').user_no}
					],
					has: [
						'sum',
						'count',
						{type: 2,status: ['in', [0, 1]],behavior: 2,withdraw:1,user_no:uni.getStorageSync('riderInfo').user_no}
					],
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						
						self.mainData.push.apply(self.mainData, res.info.data);
					}
					self.allCount = res.info.compute.all
					console.log(self.mainData)
				};
				self.$apis.flowLogGet(postData, callback);
			},
		},
	}
</script>

<style>
	@import "../../assets/style/public.css";
	@import "../../assets/style/orderNav.css";
	@import "../../assets/style/user.css";

	.fabubtn {
		width: 50px;
		height: 50px;
		line-height: 50px;
		border-radius: 50%;
		background: url(../../static/images/promote-icon1.png) no-repeat 0 0/100% 100%;
		text-align: center;
		position: fixed;
		bottom: 20%;
		right: 10px;
		z-index: 66;
		box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
	}

	.fabubtn a {
		width: 100%;
		line-height: 50px;
		display: block;
	}
</style>
