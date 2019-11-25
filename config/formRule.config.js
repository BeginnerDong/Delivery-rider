/* 
 * 应用表单校验相关配置
 * 依赖：graceChecker.js 进行校验
 * 
 * 使用：引入该js到页面，let res = graceChecker.check({phoneNo:"",code:""},formRule.loginRule)
 */

export default {
	/* 用户登录 */
	loginRule: [{
		name: "openId",
		checkType: "notnull",
		checkRule: "",
		errorMsg: "登录的openId为空,请从所属公众号菜单打开链接"
	},{
		name: "phoneNo",
		checkType: "phoneno",
		checkRule: "",
		errorMsg: "手机号格式不正确"
	}, {
		name: "code",
		checkType: "string",
		checkRule: "6",
		errorMsg: "请输入6位验证码"
	}],

	/* 发送验证码验证手机号 */
	sendCodeRule: [{
		name: "phoneNo",
		checkType: "notnull",
		checkRule: "",
		errorMsg: "手机号不能为空"
	}, {
		name: "phoneNo",
		checkType: "phoneno",
		checkRule: "",
		errorMsg: "手机号格式不正确"
	}],

	/* 商户注册 */
	regCustomerRule: [{
		name: "openId",
		checkType: "notnull",
		checkRule: "",
		errorMsg: "缺失openId"
	}, {
		name: "referrer",
		checkType: "notnull",
		checkRule: "",
		errorMsg: "缺失referrer"
	}, {
		name: "userName",
		checkType: "string",
		checkRule: "1,3",
		errorMsg: "姓名应为1-3个字符"
	}, {
		name: "idCard",
		checkType: "string",
		checkRule: "15,18",
		errorMsg: "身份证号格式不正确"
	}, {
		name: "cardNo",
		checkType: "int",
		checkRule: "3,20",
		errorMsg: "银行卡号格式不正确"
	}, {
		name: "cityNo",
		checkType: "notnull",
		checkRule: "",
		errorMsg: "请选择开户地区"
	}, {
		name: "bankName",
		checkType: "notnull",
		checkRule: "",
		errorMsg: "银行名称不能为空"
	}, {
		name: "phoneNo",
		checkType: "phoneno",
		checkRule: "",
		errorMsg: "手机号格式不正确"
	}, {
		name: "settleCardImgId",
		checkType: "notnull",
		checkRule: "",
		errorMsg: "请上传身份证和结算卡照片"
	}, {
		name: "cardHolderBackImgId",
		checkType: "notnull",
		checkRule: "",
		errorMsg: "请上传身份证国徽面照片"
	}, {
		name: "cardHolderIdImgId",
		checkType: "notnull",
		checkRule: "",
		errorMsg: "请上传手持身份证合影照片"
	}],

	/* 修改结算卡 */
	updataCustomerCardRule: [{
		name: "customerNo",
		checkType: "notnull",
		checkRule: "",
		errorMsg: "商户编号为空"
	}, {
		name: "userName",
		checkType: "string",
		checkRule: "1,3",
		errorMsg: "姓名应为1-3个字符"
	}, {
		name: "idCard",
		checkType: "string",
		checkRule: "15,18",
		errorMsg: "身份证号格式不正确"
	}, {
		name: "cardNo",
		checkType: "int",
		checkRule: "3,20",
		errorMsg: "银行卡号格式不正确"
	}, {
		name: "cityNo",
		checkType: "notnull",
		checkRule: "",
		errorMsg: "请选择开户地区"
	}, {
		name: "bankName",
		checkType: "notnull",
		checkRule: "",
		errorMsg: "未查询到银行名称"
	}, {
		name: "phoneNo",
		checkType: "phoneno",
		checkRule: "",
		errorMsg: "手机号格式不正确"
	}, {
		name: "settleCardImgId",
		checkType: "notnull",
		checkRule: "",
		errorMsg: "请上传身份证和结算卡照片"
	}, {
		name: "cardHolderIdImgId",
		checkType: "notnull",
		checkRule: "",
		errorMsg: "请上传手持身份证合影照片"
	}],

	/* 信用卡添加 */
	ccAddRule: [{
		name: "cardNo",
		checkType: "int",
		checkRule: "3,20",
		errorMsg: "银行卡号格式不正确"
	}, {
		name: "accountName",
		checkType: "notnull",
		checkRule: "",
		errorMsg: "开户名称不能为空"
	}, {
		name: "reservedPhoneNo",
		checkType: "phoneno",
		checkRule: "",
		errorMsg: "手机号格式不正确"
	}, {
		name: "idCard",
		checkType: "string",
		checkRule: "15,18",
		errorMsg: "身份证号格式不正确"
	}, {
		name: "bankName",
		checkType: "notnull",
		checkRule: "",
		errorMsg: "银行名称不能为空"
	}]
}
