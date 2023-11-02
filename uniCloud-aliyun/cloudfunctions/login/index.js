'use strict';
const APPID = 'wx6144c32cd958dba2'
const SECRET = '481413c042965a66a67b848b0e3b5d1a'
const db = uniCloud.database()
const users = db.collection("users")
exports.main = async (event, context) => {
	const {
		code,
		avatarUrl,
		gender,
		nickName
	} = event.userInfo
	const URL = `https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${SECRET}&js_code=${code}&grant_type=authorization_code 
`
	const requestOptions = {
		method: 'GET',
		dataType: 'json'
	}
	const res = await uniCloud.httpclient.request(URL, requestOptions)
	const OPENID = res.data.openid
	const user = await users.where({
		open_id: OPENID
	}).get()
	var userinfo = {}
	if (user.data.length == 0) {
		userinfo = {
			nickName: nickName,
			avatarUrl: avatarUrl,
			gender: gender,
			open_id: OPENID,
			stuAuthStatus:0,
			registerDate: new Date().getTime()
		}
		await users.add(userinfo)
	} 
	const user1 = await users.where({
		open_id: OPENID
	}).get()
	userinfo = user1.data[0]
	return {
		msg: '登录成功',
		data: userinfo
	}
};