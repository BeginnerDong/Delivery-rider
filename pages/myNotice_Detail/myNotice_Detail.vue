<template>
	<div>
		<div class="xqTex_infor pdlr4 pdt15">
			<view class="content ql-editor" v-html="mainData.content">
			</view>
		</div>
		
	</div>
</template>


<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				
				mainData:{}
			}
		},
		onLoad(options) {
			const self = this;
			self.id = options.id;
			self.$Utils.loadAll(['getMainData'], self);
		},
		methods: {
			
			getMainData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					id:self.id,
				};
				postData.getAfter ={
					log:{
						token:uni.getStorageSync('riderToken'),
						tableName:'Log',
						middleKey:'relation_id',
						key:'id',
						condition:'=',
						searchItem:{
							type:1,
							status:1,
						}
					}
				};
				var callback = function(res){
				    console.log('getMainData', res);
					if(res.info.data.length>0){
						self.mainData = res.info.data[0];
						if(self.mainData.log.length==0){
							self.addLog()
						};
						const regex = new RegExp('<img', 'gi');
						self.mainData.content = self.mainData.content.replace(regex, `<img style="max-width: 100%;"`);
						self.$Utils.finishFunc('getMainData');
					}      
				};
				self.$apis.messageGet(postData, callback);
			},
			
			addLog() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getRiderToken';
				postData.data = {
					type:1,
					title: '阅读记录',
					relation_id: self.mainData.id,
					user_no:uni.getStorageSync('riderInfo').user_no,
					thirdapp_id:2,
					user_type:1
				};
				var callback = function(res){
					if (res.solely_code == 100000) {
						console.log('已阅读')
					  
					} else {
						self.$Utils.showToast(res.msg, 'none', 1000)
					};
				};
				self.$apis.logAdd(postData, callback);
			}
			
		},
	}
</script>

<style>
	@import "../../assets/style/public.css";
</style>

