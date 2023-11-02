import API from "@/api/index.js"

// 本地存储的keys
const STORAGE_KEYS = {
	ISAUTHORIZED: "isAuthorized",
	USERINFO: "userinfo"
}

// 过期时间
const EXPIRE_TIME = 7 * 24 * 60 * 60 * 1000

const TIPS_TEXT = {
	AUTH_LOGIN: "亲，授权微信登录后才能正常使用小程序功能",
	RELOGIN: "亲,您的登录过期了哦,请点击确定重新登录~"
}

var tips = TIPS_TEXT.AUTH_LOGIN
var userinfo = {}


// 检查是否已经认证
async function checkIsAuthorized() {
	var isAuth
	isAuth = uni.getStorageSync(STORAGE_KEYS.ISAUTHORIZED)
	if (checkIsExpired()) {
		tips = TIPS_TEXT.RELOGIN
		isAuth = false
	}
	if (!isAuth) {
		login()
	} else {
		let isExist
		const _id = getLocalUserInfo()._id
		// 检查数据库中是否存在该用户(解决如果数据库删除用户的问题)
		await API.checkIsExistUser(_id).then(res => {
			isExist = res.data
		})
		if (!isExist) login()
	}
}


// 授权提示
function login() {
	uni.showModal({
		title: '温馨提示',
		content: tips,
		success(res) {
			if (res.confirm) {
				uni.showLoading({
					title: "登录中",
					mask: false
				});
				getUserInfo()
			} else {
				uni.showToast({
					title: '您取消了授权',
					duration: 2000,
					icon: 'none'
				});

			}
		}
	})

}

// 获取基本用户信息
function getUserInfo() {
	uni.getUserProfile({
		desc: "注册用户信息使用",
		lang: "zh_CN",
		success: (res) => {
			let userInfo = res.userInfo
			userinfo.avatarUrl = userInfo.avatarUrl
			userinfo.nickName = userInfo.nickName
			userinfo.gender = userInfo.gender
			getCode()
		}
	})
}


// 获取code 用于换取openid
function getCode() {
	uni.login({
		provider: 'weixin',
		success: function(loginRes) {
			userinfo.code = loginRes.code
			API.login(userinfo).then(res => {
				loginSuccess(res.data)
			})
		},
		fail: function(err) {
			console.log("loginFail", err)
			loginFail()
		}
	});
}

// 登录成功的毁掉函数
function loginSuccess(data) {
	uni.hideLoading()
	updateTokenStorage(data)
	updateIsLoginStorage(true)
	uni.showToast({
		title: '登陆成功！',
	});
	setTimeout(() => {
		uni.reLaunch({
			url: "/pages/index/index"
		})
	}, 800)
}

// 登录失败的回掉
function loginFail() {
	uni.hideLoading()
	updateTokenStorage()
	updateIsLoginStorage()
	uni.showToast({
		title: '登陆失败！',
		icon: 'none'
	});
}

// 更新用户信息的本地存储
function updateTokenStorage(data = null) {
	if (data) {
		const expiresTime = new Date().getTime() + EXPIRE_TIME
		data = {
			...data,
			expiresTime: expiresTime
		}
	}
	uni.setStorageSync(STORAGE_KEYS.USERINFO, data)
}

function updateIsLoginStorage(data = null) {
	uni.setStorageSync(STORAGE_KEYS.ISAUTHORIZED, data)
}

function getLocalUserInfo() {
	return uni.getStorageSync(STORAGE_KEYS.USERINFO)
}

function getIsLogin(){
	return uni.getStorageSync(STORAGE_KEYS.ISAUTHORIZED)
}

// 检查是否过期
function checkIsExpired() {
	return new Date().getTime() > getLocalUserInfo().expiresTime
}
const AUTH = {
	checkIsAuthorized,
	getLocalUserInfo,
	updateIsLoginStorage,
	updateTokenStorage,
	getIsLogin
}

export default AUTH