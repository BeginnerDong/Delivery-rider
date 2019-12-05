<template>
	<div>
		
		<div class="noticeList">
			<ul>
				<li v-for="(item,index) in mainData" :data-id="item.id"
				@click="Router.navigateTo({route:{path:'/pages/myNotice_Detail/myNotice_Detail?id='+$event.currentTarget.dataset.id}})">	
					<div class="L-icon pr"><em  v-if="item.log&&item.log.length==0" class="dian"></em></div>
					<div class="text avoidOverflow3">{{item.description}}</div>
				</li>
				
			</ul>
		</div>
		
	</div>
</template>


<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				searchItem:{
					type:1,
				
				},
				userInfoData:{},
				mainData:[],
				paginate:{
					count: 0,
					currentPage: 1,
					pagesize: 10,
					is_page: true,
				},
				
			}
		},
		
		onLoad(options) {
			const self = this;
			//self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
			//self.$Utils.loadAll(['getMainData'], self)
		
		},
			
		onShow() {
			const self =  this;
			
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
				postData.getAfter ={
					log:{
						token:uni.getStorageSync('riderToken'),
						tableName:'Log',
						middleKey:'id',
						key:'relation_id',
						condition:'=',
						searchItem:{
							type:1,
							status:1,
						}
					}
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData.push.apply(self.mainData, res.info.data);
					}
					console.log(self.mainData)
				};
				self.$apis.messageGet(postData, callback);
			},

		},
	};
</script>

<style>
	@import "../../assets/style/public.css";
	
	/* 通知 */
	.noticeList li{border-bottom: 5px solid #F5F5F5;padding: 15px 4% 15px 55px;box-sizing: border-box; position: relative;align-items: initial;}
	.noticeList li .L-icon{width: 30px; height: 30px; display: block;position: absolute; top: 20px;left: 10px;background: url(../../static/images/notice-icon1.png) no-repeat 0 0/100% 100%;}
	.noticeList li .L-icon .dian{width: 6px; height: 6px; border-radius: 50%;background: #FF3B3B; position: absolute; top: -3px;right: -3px;}
	.noticeList li .text{min-height: 30px; color: #666; font-size: 13px;}
</style>

