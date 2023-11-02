'use strict';
const db = uniCloud.database()
const stu = db.collection("stu_auth_list")
const users = db.collection("users")
exports.main = async (event, context) => {
	try {
		const {
			user_id,
			stuInfo
		} = event
		let student = await stu.where({
			user_id: user_id
		}).get()
		var res
		if (student.data.length == 0) {
			await users.where({
				_id: user_id
			}).update({
				stuAuthStatus: 2 // 正在审核
			})
			stuInfo.user_id = user_id
			res = await stu.add(stuInfo)
		} else {
			res = await stu.where({
				user_id: user_id
			}).update(stuInfo)
		}
		console.log(res)
		return {
			msg: "上传成功"
		}
	} catch {
		return {
			msg: "上传失败"
		}
	}

};