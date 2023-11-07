'use strict';
const db = uniCloud.database()
const stu = db.collection("stu_auth_list")
const users = db.collection("users")
exports.main = async (event, context) => {
		const {
			user_id,
			stuInfo
		} = event
		// 先看看有没有存在的认证
		let student = await stu.where({
			user_id: user_id
		}).get()
		var res
		// 没有存在的认证就添加一个
		if (student.data.length == 0) {
			stuInfo.user_id = user_id
			res = await stu.add(stuInfo)
		} else {
			res = await stu.where({
				user_id: user_id
			}).update( {
				Sname: stuInfo.Sname,
				SNo: stuInfo.SNo
			})
		}
		if (res.updated != 0) {
			await users.where({
				_id: user_id
			}).update({
				stuAuthStatus: 2 // 正在审核
				
			})
			return {
				msg: "上传成功"
			}
		}else {
			return {
				msg:"上传失败"
			}
		}

		console.log("res", res)
		
		

};