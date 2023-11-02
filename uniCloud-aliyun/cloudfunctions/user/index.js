'use strict';
const db = uniCloud.database()
const users = db.collection("users")
const stu = db.collection('stu_auth_list')
exports.main = async (event, context) => {
	const {
		action,
		data
	} = event
	const {
		_id
	} = data
	var res = {}
	switch (action) {
		case "getUserInfo":
			res = getUserInfoById(_id)
			break
		case "isExist":
			res = isExistUser(_id)
			break
		case "getStuInfo":
			const {user_id} = data
			res = getStuInfo(user_id)
			break
			
		default:
			break
	}
	return res
};


async function getUserInfoById(_id) {
	let res = await users.doc(_id).get()
	return {
		data:res.data[0]
	}
}

async function isExistUser(_id) {
	let res = await users.doc(_id).get()
	let flag = true
	if (!res.data || res.data.length == 0) flag = false
	return {
		data:flag
	}
}

async function getStuInfo(user_id){
	let res = await stu.where({
		user_id:user_id
	}).get()
	return {
		data:res.data[0]
	}
}