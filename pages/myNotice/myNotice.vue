<template>
	<div>
		
		<div class="noticeList">
			<ul>
				<li @click="Router.navigateTo({route:{path:'/pages/myNotice_Detail/myNotice_Detail'}})">
						<div class="L-icon pr"><em class="dian"></em></div>
						<div class="text avoidOverflow3">内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</div>
				</li>
				<li @click="Router.navigateTo({route:{path:'/pages/myNotice_Detail/myNotice_Detail'}})">
						<div class="L-icon pr"></div>
						<div class="text avoidOverflow3">内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</div>
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
	
	/* 通知 */
	.noticeList li{border-bottom: 5px solid #F5F5F5;padding: 15px 4% 15px 55px;box-sizing: border-box; position: relative;align-items: initial;}
	.noticeList li .L-icon{width: 30px; height: 30px; display: block;position: absolute; top: 20px;left: 10px;background: url(../../static/images/notice-icon1.png) no-repeat 0 0/100% 100%;}
	.noticeList li .L-icon .dian{width: 6px; height: 6px; border-radius: 50%;background: #FF3B3B; position: absolute; top: -3px;right: -3px;}
	.noticeList li .text{min-height: 30px; color: #666; font-size: 13px;}
</style>

