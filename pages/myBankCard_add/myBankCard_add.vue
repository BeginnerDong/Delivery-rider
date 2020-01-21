<template>
	<div>
		<!-- 标题 -->
		
		<div class="bankInfor">
			<ul>
				<li class="flexRowBetween">
					<div class="name fs13">银行卡开户名：</div>
					<div class="right flexEnd">
						<input type="text" v-model="submitData.name" placeholder="请输入银行卡开户名">
					</div>
				</li>
				<li class="flexRowBetween">
					<div class="name fs13">选择银行：</div>
					<div class="right flexEnd">
						<picker @change="bindPickerChange" :value="index" :range="labelData" range-key="title">
							<div class="uni-input">{{labelData[index]&&labelData[index].title?labelData[index].title:'请选择'}}</div>
						</picker>
					</div>
				</li>
				<li class="flexRowBetween">
					<div class="name fs13">银行卡卡号：</div>
					<div class="right flexEnd">
						<input type="number" v-model="submitData.number" placeholder="请输入银行卡卡号" onkeyup="this.value=this.value.replace(/\D/g,'')">
					</div>
				</li>
				<li class="flexRowBetween">
					<div class="name fs13">手机号：</div>
					<div class="right flexEnd">
						<input type="number" v-model="submitData.phone" placeholder="请输入您银行卡绑定的手机号" onkeyup="this.value=this.value.replace(/\D/g,'')"  maxlength="11">
					</div>
				</li>
				<li class="flexRowBetween">
					<div class="name fs13" style="width: 50%;">设为默认银行卡</div>
					<div class="edit" style="width:50%;text-align: right">
						<switch @change="choose" :checked="submitData.isdefault==1?true:false" color="#2FA0ED"></switch>
						<!-- <img v-if="!is_show" class="mmIcon" src="../../static/images/address-icon03.png" alt="">
						<img v-if="is_show" class="mmIcon" src="../../static/images/address-icon02.png" alt=""> -->
					</div>
				</li>	
			</ul>
		</div>
		
		<div class="submitbtn" style="margin-top: 100px;">
			<button class="btn" @click="Utils.stopMultiClick(submit)">保存</button>
		</div>
	</div>
</template>


<script>
	import mpvuePicker from '../../components/mpvue-picker/mpvuePicker.vue';
	// https://github.com/zhetengbiji/mpvue-citypicker
	import mpvueCityPicker from '../../components/mpvue-citypicker/mpvueCityPicker.vue'
	import cityData from '../../common/city.data.js';

	export default {
		components: {
			mpvuePicker,
			mpvueCityPicker
		},
		
		
		data() {
			return {
				submitData: {
					name: '',
					number: '',
					phone: '',
					bank:'',
					isdefault:''
				},		
				index:-1,
				labelData:[],
				Utils:this.$Utils
			}
		},
		onLoad(options) {
			const self = this;
			self.$Utils.loadAll(['getLabelData'], self)	
			if(options.id){
				self.id = options.id;
				self.getMainData()	
			}
		},
		
		methods: {
			
			bindPickerChange(e) {
				const self=this;
				console.log('picker发送选择改变，携带值为', e.target.value)
				self.index = e.target.value;
				self.submitData.bank=self.labelData[self.index].id
			},
			
			getLabelData() {
				const self = this;	
				const postData = {};	
				postData.searchItem = {
					thirdapp_id:2,	
				};
				postData.getBefore = {
					caseData: {
						tableName: 'Label',
						searchItem: {
							title: ['=', ['银行类型']],
						},
						middleKey: 'parentid',
						key: 'id',
						condition: 'in',
					},
				};
				postData.order = {
					create_time:'asc'
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.labelData.push.apply(self.labelData, res.info.data);
					}
					console.log('self.labelData',self.labelData)
					self.$Utils.finishFunc('getLabelData');
				};
				self.$apis.labelGet(postData, callback);
			},
				
	
			
			choose(e) {
				const self = this;
				if(e.target.value){
					self.submitData.isdefault = 1
				}else{
					self.submitData.isdefault = 0
				}
				console.log('switch2 发生 change 事件，携带值为', e.target.value)
			},

			getMainData(id) {
				const self = this;
				const postData = {};
				postData.searchItem = {};
				postData.searchItem.id = self.id;
				postData.tokenFuncName = 'getRiderToken';

				const callback = (res) => {
					console.log(res);
					
					self.submitData.name = res.info.data[0].name;
					self.submitData.number = res.info.data[0].number;
					self.submitData.phone = res.info.data[0].phone;
					self.submitData.isdefault = res.info.data[0].isdefault;
					self.submitData.bank = res.info.data[0].bank;
					for (var i = 0; i < self.labelData.length; i++) {
						if(self.labelData[i].id==res.info.data[0].bank){
							console.log(32423)
							self.index = i
						}
					}
					console.log(self.index)
				};
				self.$apis.cardGet(postData, callback);
			},

			cardUpdate() {
				const self = this;
				const postData = {};

				postData.tokenFuncName = 'getRiderToken';

				postData.searchItem = {};
				postData.searchItem.id = self.id;
				postData.data = {};
				postData.data = self.$Utils.cloneForm(self.submitData);

				const callback = (data) => {
					uni.setStorageSync('canClick', true);
					if (data && data.solely_code == 100000) {
						self.$Utils.showToast('修改成功','success');
						setTimeout(function() {
							uni.navigateBack({
								delta:1
							})
						}, 1000);
					} else {
						self.$Utils.showToast(data.msg,'error')
					};
					
				};
				self.$apis.cardUpdate(postData, callback);
			},


			cardAdd() {
				const self = this;
				const postData = {};

				postData.tokenFuncName = 'getRiderToken';

				postData.data = {};
				postData.data = self.$Utils.cloneForm(self.submitData);

				const callback = (data) => {
					uni.setStorageSync('canClick', true);
					if (data && data.solely_code == 100000) {
						self.$Utils.showToast('添加成功','success');
						setTimeout(function() {
							uni.navigateBack({
								delta:1
							})
						}, 1000);
						//self.$Router.redirectTo({route:{path:'/pages/myBankCard/myBankCard'}})
					} else {
						self.$Utils.showToast(data.msg,'success')
					}
					
				};
				self.$apis.cardAdd(postData, callback);
			},


			submit() {
				const self = this;
				
				var phone = self.submitData.phone;
				const pass = self.$Utils.checkComplete(self.submitData);

				console.log('self.data.sForm', self.submitData)
				console.log('pass', pass)
				if (pass) {
					
					if (self.id) {

						self.cardUpdate();
					} else {

						self.cardAdd();
					}

			
				} else {
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('请补全信息','success');
				};
			},

		}
	}
</script>

<style>
	@import "../../assets/style/public.css";
	@import "../../assets/style/bankInfor.css";
</style>

