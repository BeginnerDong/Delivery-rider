window.base = {
	g_restUrl: 'http://www.xianaxty.com/api/public/index.php/api/v1/',

	thirdapp_id:2,
	test:666,
	bus:new Vue(),
	getUserToken: function(callback) {


		var param = this.GetRequest();
		console.log(param);
		if (param.code) {
			var postData = {
				thirdapp_id: 2,
				code: param.code,
			};
			var c_callback = function(res){
				console.log(res)
				if (res.token) {
					localStorage.setItem('user_token', res.token);
					localStorage.setItem('user_no', res.info.user_no);

					this.setStorageArray('user_info', res.info, 'id', 999, 'unshift');
					callback && callback();
				} else {
					alert('获取token失败')
				};
			};
			this.getWxauthToken(postData, c_callback);
		} else if (localStorage.getItem('user_token')) {
			callback && callback();
		} else {
			var href = window.location.href;
			window.location.href =
			'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx07335ba385a82d49&redirect_uri=' +
			encodeURIComponent(href) + '&response_type=code&scope=snsapi_userinfo';
		};

	},

	realPay:function(param, callback) {

		function onBridgeReady(param) {
			WeixinJSBridge.invoke(
				'getBrandWCPayRequest', {
					"appId": "wx7cd6c5fcb1acb373", //公众号名称，由商户传入     
					'timeStamp': param.timeStamp,
					'nonceStr': param.nonceStr,
					'package': param.package,
					'signType': param.signType,
					'paySign': param.paySign,
				},
				function(res) {

					if (res.err_msg == "get_brand_wcpay_request:ok") {
						// 使用以上方式判断前端返回,微信团队郑重提示：
						//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
						callback && callback(1);
					} else {
						callback && callback(0);
					}
				});
		}
		if (typeof WeixinJSBridge == "undefined") {
			if (document.addEventListener) {
				document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
			} else if (document.attachEvent) {
				document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
				document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
			}
		} else {
			onBridgeReady(param);
		}

	},

	directPay: function(param, callback) {
		var allParams = {
			url: 'Base/Pay/directPay',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.getData(allParams);
	},
	
	uploadByUrl:function(param,callback) {
	  
	    var allParams = {
	        url:'Base/FtpFile/uploadByUrl',
	        type:'post',
	        data:param,
	        sCallback: function(data){
	            callback&&callback(data);
	        }
	    }; 
	    this.getData(allParams)
	},

	addItemInArray:function(array, fieldName) {
		var count = 0;
		for (var i = 0; i < array.length; i++) {
			if (array[i][fieldName]) {
				count += parseFloat(array[i][fieldName])
			};
		};
		return count.toFixed(2);
	},

	getMerchantToken: function(callback) {
		var href = window.location.href;
		console.log('href', href);
		var token = localStorage.getItem('merchant_token');
		if (token) {
			callback && callback();
		} else {
			window.location.href = './wxBusinessLogin.html'
		};
	},

	getWxauthToken: function(param, callback) {

		var allParams = {
			url: 'Wxauth',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.getData(allParams);

	},

	WxJssdk: function(param, callback) {

		var allParams = {
			url: 'WxJssdk',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.getData(allParams);
	},

	getQrCommonCode:function(param, callback) {
		var allParams = {
			url: 'Base/Qr/CommonQrGet',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.getData(allParams);
	},

	qrcodeGet:function(param, callback) {
		var allParams = {
			url: 'Common/Qrcode/get',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.getData(allParams);
	},

	qrcodeUpdate:function(param, callback) {
		var allParams = {
			url: 'Common/Qrcode/update',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.getData(allParams);
	},

	pay: function(param, callback) {
		var allParams = {
			url: 'Base/Pay/pay',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.getData(allParams);
	},

	getData: function(params) {
		if (!params.type) {
			params.type = 'get';
		}
		var that = this;
		$.ajax({
			type: params.type,
			url: this.g_restUrl + params.url,
			data: params.data,
			success: function(res) {
				if (res.solely_code == 201000) {
					var loca = window.location;
					window.location.href = loca.origin + loca.pathname;
				} else if (res.solely_code == 200000) {
					console.log(that.GetUrlRelativePath().substr(1, 2));
					if (that.GetUrlRelativePath().substr(1, 2) == 'wx') {

						localStorage.removeItem('merchant_token');
						localStorage.removeItem('merchant_no');
						window.location.href = './wxBusinessLogin.html'
					} else {
						localStorage.removeItem('user_token');
						localStorage.removeItem('user_no');
						that.getUserToken();
					};
				} else {
					params.sCallback && params.sCallback(res);
				};
			},
			error: function(res) {
				params.eCallback && params.eCallback(res);
				console.log('ajax-error', JSON.stringify(res));
			}
		});
	},

	articleList: function(param, callback) {

		var allParams = {
			url: 'Common/Article/get',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.getData(allParams)
	},

	messageAdd: function(param, callback) {

		var allParams = {
			url: 'Common/Message/add',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.getData(allParams)
	},

	upLoadImg: function(param, callback) {
		var that = this;
		alert('upLoadImg999')
		$.ajax({ // $.post，告辞
			type: 'post',
			contentType: false, // 关关关！必须得 false
			// 这个不关会扔一个默认值 application/x-www-form-urlencoded 过去，后端拿不到数据的！
			// 而且你甚至不能传个字符串 'multipart/form-data'，后端一样拿不到数据！
			processData: false, // 关关关！重点
			async: true, //是否同步，否
			cache: false,
			timeout: 100000,
			url: 'http://www.walhr.com/api/public/index.php/api/v1/Base/FtpImage/upload',
			data: param,
			success: function(res) {

				if (res.solely_code == 201000) {
					var loca = window.location;
					window.location.href = loca.origin + loca.pathname;
				} else if (res.solely_code == 200000) {
					localStorage.removeItem('user_token');
					localStorage.removeItem('user_no');
					that.getUserToken();
				} else {
					callback && callback(res);
				};

			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				//callback && callback(res);
				console.log('XMLHttpRequest-status', XMLHttpRequest.status);
				console.log('XMLHttpRequest-readyState', XMLHttpRequest.readyState);
				console.log('XMLHttpRequest-responseText', XMLHttpRequest.responseText);
				console.log('textStatus', textStatus);
				console.log('errorThrown', errorThrown);
			}
		});
	},



	upLoadImgByJs: function(param, callback) {
		var that = this;




		var xhr = new XMLHttpRequest();


		//post方式    
		xhr.open('POST', 'http://www.walhr.com/api/public/index.php/api/v1/Base/FtpImage/upload', true);

		try {
			console.log('upLoadImgByJs-send', param)
			xhr.send(param);
		} catch (error) {
			console.log('error', error)
			console.log('error.message', error.message)
		};






		//success回调    
		xhr.onreadystatechange = function() {
			console.log('onreadystatechange', xhr)
			if (xhr.readyState == 4 && xhr.status == 200) {

				var data = xhr.responseText;
				data = JSON.parse(xhr.responseText)
				console.log(data);

				if (data.solely_code == 201000) {
					var loca = window.location;
					window.location.href = loca.origin + loca.pathname;
				} else if (data.solely_code == 200000) {
					localStorage.removeItem('user_token');
					localStorage.removeItem('user_no');
					that.getUserToken();
				} else {
					callback && callback(data);
				};
			}
		};
		//设置超时时间    
		xhr.timeout = 1000000;
		xhr.ontimeout = function(event) {}





	},

	loginUp: function(param, callback) {

		$.ajax({ // $.post，告辞
			type: 'post',
			contentType: false, // 关关关！必须得 false
			// 这个不关会扔一个默认值 application/x-www-form-urlencoded 过去，后端拿不到数据的！
			// 而且你甚至不能传个字符串 'multipart/form-data'，后端一样拿不到数据！
			processData: false, // 关关关！重点
			url: 'http://solelytech.iicp.net/api/hualuzhuop/public/index.php/api/v1/Func/Common/loginByUp',
			data: param,
			success: function(res) {
				callback && callback(res);
			},
			error: function(res) {
				callback && callback(res);
			}
		});

	},


	labelGet: function(param, callback) {

		var allParams = {
			url: 'Common/Label/get',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.getData(allParams)
	},

	orderItemGet: function(param, callback) {

		var allParams = {
			url: 'Common/OrderItem/get',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.getData(allParams)
	},

	orderItemUpdate: function(param, callback) {

		var allParams = {
			url: 'Common/OrderItem/update',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.getData(allParams)
	},

	orderItemDeliver: function(param, callback) {

		var allParams = {
			url: '/Func/Order/deliver',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.getData(allParams)
	},




	distriGet: function(param, callback) {

		var allParams = {
			url: 'Common/Distribution/get',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.getData(allParams)
	},


	distriAdd: function(param, callback) {

		var allParams = {
			url: 'Common/Distribution/add',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.getData(allParams)
	},

	flowLogGet: function(param, callback) {

		var allParams = {
			url: 'Common/FlowLog/get',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.getData(allParams)
	},

	flowLogAdd: function(param, callback) {

		var allParams = {
			url: 'Common/FlowLog/add',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.getData(allParams)
	},

	userGet: function(param, callback) {

		var allParams = {
			url: 'Base/User/get',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.getData(allParams)
	},

	addOrder:function(param, callback) {
		var allParams = {
			url: 'Func/Order/addOrder',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.getData(allParams);
	},

	orderDelete: function(param, callback) {
		var allParams = {
			url: 'Common/Order/delete',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.getData(allParams);
	},

	orderUpdate: function(param, callback) {
		var allParams = {
			url: 'Common/Order/update',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.getData(allParams);
	},

	register: function(param, callback) {
		var allParams = {
			url: 'Project/Solely/register',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.getData(allParams);
	},



	orderGet: function(param, callback) {
		var allParams = {
			url: 'Common/Order/get',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.getData(allParams);
	},

	userInfoUpdate: function(param, callback) {

		var allParams = {
			url: 'Common/UserInfo/update',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.getData(allParams)
	},

	userInfoGet: function(param, callback) {

		var allParams = {
			url: 'Common/UserInfo/get',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.getData(allParams)
	},

	addressAdd: function(param, callback) {

		var allParams = {
			url: 'Common/c/add',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.getData(allParams)
	},

	addressAdd: function(param, callback) {

		var allParams = {
			url: 'Common/UserAddress/add',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.getData(allParams)
	},

	addressDelete: function(param, callback) {

		var allParams = {
			url: 'Common/UserAddress/delete',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.getData(allParams)
	},

	addressUpdate: function(param, callback) {

		var allParams = {
			url: 'Common/UserAddress/update',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.getData(allParams)
	},


	addressGet: function(param, callback) {

		var allParams = {
			url: 'Common/UserAddress/get',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.getData(allParams)
	},

	messageGet: function(param, callback) {

		var allParams = {
			url: 'Common/Message/get',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.getData(allParams)
	},

	flowLogCompute:function(param, callback) {
		var allParams = {
			url: 'Common/FlowLog/compute',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.getData(allParams);
	},

	flowLogGet:function(param, callback) {
		var allParams = {
			url: 'Common/FlowLog/get',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.getData(allParams);
	},

	flowLogUpdate:function(param, callback) {
		var allParams = {
			url: 'Common/FlowLog/update',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.getData(allParams);
	},

	flowLogAdd:function(param, callback) {
		var allParams = {
			url: 'Common/FlowLog/add',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.getData(allParams);
	},




	productAdd: function(param, callback) {

		var allParams = {
			url: 'Common/Product/add',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.getData(allParams)
	},

	productUpdate: function(param, callback) {

		var allParams = {
			url: 'Common/Product/update',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.getData(allParams)
	},

	productGet: function(param, callback) {

		var allParams = {
			url: 'Common/Product/get',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.getData(allParams)
	},

	articleGet: function(param, callback) {

		var allParams = {
			url: 'Common/Article/get',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.getData(allParams)
	},



	messages: function(param, callback) {

		var allParams = {
			url: 'UserMessage/addMessage',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.getData(allParams)
	},

	JustaddMessage: function(param, callback) {

		var allParams = {
			url: 'Project/Solely/addMessage',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.getData(allParams)
		
	},


	login: function(param, callback) {

		var allParams = {
			url: 'Func/Common/loginByUp',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.getData(allParams)
	},

	/*    checkComplete:function(obj){
	        var pass = true;
	        for(var key in obj){

	          if(!obj[key]){
	            if(obj[key]===0){
	                pass = true;
	            }else{
	                pass = false;
	            };
	          };
	        };
	        return pass;
	        console.log(pass);
	    }, */

	checkComplete:function(obj) {
		var pass = true;
		for (var key in obj) {
			if (!obj[key] || JSON.stringify(obj[key]) == '[]' || JSON.stringify(obj[key]) == '{}') {
				if (obj[key] === 0) {
					pass = true;
				} else {
					pass = false;
				};
			};
		};
		return pass;
	},

	articleOne: function(param, callback) {
		var allParams = {
			url: 'UserArticle/GetInfo',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.getData(allParams)
	},

	menuOne: function(param, callback) {
		var allParams = {
			url: 'UserMenu/GetInfo',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.getData(allParams)
	},

	themeList: function(param, callback) {
		var allParams = {
			url: 'UserContent/GetList',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.getData(allParams)
	},

	themeOne: function(param, callback) {
		var allParams = {
			url: 'UserContent/GetInfo',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.getData(allParams)
	},

	themeNum: function(param, callback) {
		var allParams = {
			url: 'UserContent/GetHomeTheme',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.getData(allParams)
	},

	categoryTree: function(param, callback) {
		var allParams = {
			url: 'UserCategory/GetTree',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.getData(allParams)
	},

	cloneForm: function(form) {
		var res = JSON.parse(JSON.stringify(form));
		return res;
	},

	getDataSet: function(e) {
		return e.target.dataset;
	},

	getSelectValue: function(e) {
		return e.target.selectedOptions[0].text;
	},

	getHtmlValue: function(e) {
		return e.target.innerText;
	},

	GetUrlRelativePath: function() {

		var url = document.location.toString();
		var arrUrl = url.split("//");

		var start = arrUrl[1].indexOf("/");
		var relUrl = arrUrl[1].substring(start); //stop省略，截取从start开始到结尾的所有字符

		if (relUrl.indexOf("?") != -1) {
			relUrl = relUrl.split("?")[0];
		}
		return relUrl;
	},


	getDataset: function(ele) {
		if (ele.dataset) {
			return ele.dataset;
		} else {
			var attrs = ele.attributes, //元素的属性集合
				dataset = {},
				name,
				matchStr;

			for (var i = 0; i < attrs.length; i++) {
				//是否是data- 开头
				matchStr = attrs[i].name.match(/^data-(.+)/);
				if (matchStr) {
					//data-auto-play 转成驼峰写法 autoPlay
					name = matchStr[1].replace(/-([\da-z])/gi, function(all, letter) {
						return letter.toUpperCase();
					});
					dataset[name] = attrs[i].value;
				}
			}
			return dataset;
		}
	},



	findKeyFromArray: function(Array, key, value) {
		var new_array = [];
		for (var i = 0; i < Array.length; i++) {

			if (Array[i][key] && Array[i][key] == value) {
				new_array.push(Array[i])
				console.log('Array', Array[i])
			};
		};
		return new_array;
	},

	GetRequest: function() {
		var url = decodeURI(location.search); //获取url中"?"符后的字串  
		var theRequest = new Object();
		if (url.indexOf("?") != -1) {
			var str = url.substr(1); //去掉“？”
			strs = str.split("&");
			for (var i = 0; i < strs.length; i++) {
				theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
			}
		}
		return theRequest;
	},

	getUrlVars:function() {
		var vars = [],
			hash;
		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		for (var i = 0; i < hashes.length; i++) {
			hash = hashes[i].split('=');
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}
		return vars;
	},


	computePageArr: function(self) {
		self.allPages = Math.ceil(self.paginate['count'] / self.paginate['pagesize']);
		console.log(self.allPages);
		console.log(self.paginate);
		self.pageArray = [];
		self.pageArray.push(self.paginate.currentPage);
		if (self.paginate.currentPage + 1 <= self.allPages) {
			if (self.paginate.currentPage + 2 <= self.allPages) {
				self.pageArray.push(self.paginate.currentPage + 1);
				self.pageArray.push(self.paginate.currentPage + 2);
			} else {
				self.pageArray.push(self.paginate.currentPage + 1);
			}
		};
		if (self.paginate.currentPage - 1 > 0) {
			if (self.paginate.currentPage - 2 > 0) {
				self.pageArray.unshift(self.paginate.currentPage - 1);
				self.pageArray.unshift(self.paginate.currentPage - 2);

			} else {
				self.pageArray.unshift(self.paginate.currentPage - 1);
			}
		};

	},

	changePage: function(dataSet, self) {
		if (dataSet.type == 'next') {
			if (self.paginate.currentPage >= self.allPages) {
				alert('已经到底啦')
			} else {
				self.paginate.currentPage++;
				
			}
		};
		if (dataSet.type == 'back') {
			if (self.paginate.currentPage == 1) {
				alert('已经没有啦')
			} else {
				self.paginate.currentPage--;
				
			}
		};

	},

	linkTo: function(self) {
		if (self.linkPage > self.allPages || self.linkPage < 1) {
			alert('没有那一页');
			self.linkPage = '';
		} else {
			self.paginate.currentPage = self.linkPage;
			return true;
			
		}

	},

	dealRes:function(res) {
		if (res.solely_code == 100000) {

			wx.showToast({
				title: res.msg,
				icon: 'succes',
				duration: 1000,
				mask: true
			});
			return true;

		} else {

			wx.showToast({
				title: res.msg,
				icon: 'fail',
				duration: 1000,
				mask: true
			});
			return false;
		}
	},

	footOne:function(res, name, limit, objName) {
		var self = this;
		if (localStorage.getItem(objName)) {
			var history = localStorage.getItem(objName);
			var limitSum = self.getJsonLength(history);
			console.log(limitSum);

			if (history[res[name]]) {
				history[res[name]] = res;
				localStorage.setItem(objName, JSON.stringify(history));
			} else {
				if (limitSum < limit) {
					history[res[name]] = res;
				} else {
					var historyArray = self.jsonToArray(history, 'push');
					historyArray.splice(0, 1);
					historyArray.push(res);
					var history = {};
					for (var i = 0; i < historyArray.length; i++) {
						history[historyArray[i][name]] = historyArray[i];

					};
				}
				localStorage.setItem(objName, JSON.stringify(history));
			}

		} else {
			var history = {};
			history[res[name]] = res;
			localStorage.setItem(objName, JSON.stringify(history));
		}

	},

	updateFootOne:function(name, objName, fieldName, field) {
		var self = this;
		if (localStorage.getItem(objName)) {
			var history = localStorage.getItem(objName);
			console.log(history);
			if (history[name]) {
				history[name][fieldName] = field;
				localStorage.setItem(objName, JSON.stringify(history));
			}
		} else {
			return false;
		}

	},

	deleteFootOne:function(name, objName) {
		var self = this;
		if (localStorage.getItem(objName)) {
			var history = localStorage.getItem(objName);
			console.log(history);
			if (history[name]) {
				delete history[name];
				localStorage.setItem(objName, history);
			}
		} else {
			return false;
		}

	},

	getJsonLength:function(json) {
		var length = 0;
		for (var item in json) {
			length++
		};
		return length;
	},

	jsonToArray:function(obj, type) {

		var result = [];
		for (var key in obj) {
			//result.push(key);
			if (type == 'push') {
				result.push(obj[key]);
			}

			if (type == 'unshift') {
				result.unshift(obj[key]);
			}


		}
		return result;
	},

	getStorageArray:function(storageName, key, value) {
		var self = this;
		var array = JSON.parse(localStorage.getItem(storageName));
		if (key && value && array) {
			var index = self.findItemInArray(array, key, value)[0];
			return array[index];
		} else if (array) {
			return array
		} else {
			return false
		};
	},

	setStorageArray:function(storageName, item, key, limit, type ) {

		var self = this;
		if(!type)type = 'unshift';
		if (localStorage.getItem(storageName)) {
			var array = JSON.parse(localStorage.getItem(storageName));
			if (array.length < limit) {
				self.setItemInArray(array, item, key, type);
			} else {
				if (type == 'unshift') {
					array.splice(array.length - 1, 1);
				} else {
					array.splice(0, 1);
				};
				self.setItemInArray(array, item, key, type);
			};
		} else {
			var array = [];
			array[type](item);
		};
		array = JSON.stringify(array);
		localStorage.setItem(storageName, array);
		return true;

	},

	delStorageArray:function(storageName, item, key) {

		var self = this;
		var array = JSON.parse(localStorage.getItem(storageName));
		var index = self.findItemInArray(array, key, item[key])[0];
		array.splice(index, 1);
		array = JSON.stringify(array);
		localStorage.setItem(storageName, array);
		return true;

	},


	findItemInArray:function(array, fieldName, field) {

		for (var i = 0; i < array.length; i++) {
			if (array[i][fieldName] == field) {
				return [i, array[i]];
			}
		};
		return false;

	},

	setItemInArray:function(array, item, fieldName, type) {
		if(!type)type = 'push';
		var findI = -1;
		for (var i = 0; i < array.length; i++) {
			if (array[i][fieldName] == item[fieldName]) {
				findI = i;
			};
		};
		if (findI >= 0) {
			array[i] = item;
		} else {
			array[type](item);
		};
		return array;
	},


	timestampToTime:function(timestamp) {

		timestamp = parseInt(timestamp);
		var date = new Date(timestamp * 1000);
		var format = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日';

		/* if(getDate(timestamp).getHours()<10){
			var format = format + '0' + getDate(timestamp).getHours();
		}else{
			var format = format +  getDate(timestamp).getHours();
		}
		if(getDate(timestamp).getMinutes()<10){
			var format = format + ':' + '0' + getDate(timestamp).getMinutes();
		}else{
			var format = format + ':' + getDate(timestamp).getMinutes();
		} */
		
		console.log(date)
		console.log((date.getMonth() + 1))
		return format;

	},

	throttle:function(method, context){
	    clearTimeout(method.tId);
	    method.tId = setTimeout(function(){
	        method.call(context);
	    }, 500);
	},

	debounce:function(method,delay,context){
		if(!context[method.tId]){
			context[method.tId] = true;
			context[method.tId] = setTimeout(function(){
				method();
				context[method.tId] = false;
			},delay);
		};
	},

	toFixed:function(num,d){
        num *=Math.pow(10,d);
        num = Math.round(num);
        return num/(Math.pow(10,d));
    },

}

// console.log(this);
