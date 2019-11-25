import Vue from 'vue'
import App from './App'
import store from './store'  
import $apis from './apis/index.js'
import $Router from './common/router.js'
import $Utils from './common/utils.js'
import $Token from './common/token.js'
import $Config from "./config/index.config.js"
import $AssetsConfig from './config/assets.config.js'
import $RoutesConfig from './config/routes.config.js'
import $ConstDataConfig from './config/constData.config.js'
import $modalHelper from './common/modalHelper.js'

//var jweixin = require('jweixin-module')


Vue.prototype.$store = store
Vue.prototype.$Utils = $Utils
Vue.prototype.$apis = $apis
Vue.prototype.$AssetsConfig = $AssetsConfig
Vue.prototype.$Config = $Config
Vue.prototype.$Router = $Router
Vue.prototype.$Token = $Token
//Vue.prototype.$jweixin = jweixin
Vue.config.productionTip = false

$Router.beforeEach((navType, to) => {
	if (to.route === undefined) throw ("路由钩子函数中没有找到to.route对象，路由信息:" + JSON.stringify(to));

	/* if (to.route.path === $RoutesConfig.login.path && store.getters.hasLogin) {
		uni.redirectTo({
			url: $Utils.objParseUrlAndParam($RoutesConfig.main.path, to.query)
		})
		return;
	}; */
	console.log('url',$Utils.objParseUrlAndParam(to.route.path, to.query))
	uni[navType]({
		url: $Utils.objParseUrlAndParam(to.route.path, to.query)
	})
	
	

	// 过滤需要权限的页面
	/* if (to.route.requiresAuth) {

		if (store.getters.hasLogin) {
			// 已经登录
			uni[navType]({
				url: $Utils.objParseUrlAndParam(to.route.path, to.query)
			})
		} else {
			// 登录成功后的重定向地址和参数
			let query = {
				redirectUrl: to.route.path,
				...to.query
			}
			// 没有登录 是否强制登录?
			if(store.state.forcedLogin){
				uni.redirectTo({
					url: $Utils.objParseUrlAndParam($RoutesConfig.login.path, query)
				})
			}else{
				uni.navigateTo({
					url: $Utils.objParseUrlAndParam($RoutesConfig.login.path, query)
				})
			}
		}
	} else {
		uni[navType]({
			url: $Utils.objParseUrlAndParam(to.route.path, to.query)
		})
	} */
})

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
