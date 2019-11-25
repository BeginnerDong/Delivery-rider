<template>
	<div>
		<div class="xqTex_infor pdlr4 pdt15">
			<div class="cont">
				<p>通知详情内容代办业务说明通知详情内容代办业务说明通知详情内容代办业务说明通知详情内容代办业务说明通知详情内容代办业务说明。</p>
				<p>通知详情内容代办业务说明通知详情内容代办业务说明通知详情内容代办业务说明通知详情内容代办业务说明通知详情内容代办业务说明。</p>
				<p>通知详情内容代办业务说明通知详情内容代办业务说明通知详情内容代办业务说明通知详情内容代办业务说明通知详情内容代办业务说明。</p>
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
				is_show:false
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
</style>

