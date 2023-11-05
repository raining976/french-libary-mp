'use strict';
const db = uniCloud.database()
const books = db.collection("books")
const borrow_list = db.collection("borrow_book_list")

exports.main = async (event, context) => {
	const {
		user_id,
		status
	} = event
	var res
	if (status == -1) {
		// 全部
		var $ = db.command.aggregate
		res = await borrow_list.aggregate()
			.lookup({
				from: 'books',
				localField: 'book_id',
				foreignField: '_id',
				as: 'bookInfo'
			})
			.unwind('$bookInfo')
			.project({
				_id:1,
				book_id: 1,
				status: 1,
				borrowTime:1,
				returnBookTime:1,
				bookInfo: {
					BName: '$bookInfo.BName',
					Author: '$bookInfo.Author'
					// 添加其他您想选择性返回的 book 字段
				}
			})
			.end();
	} else {
		res = await borrow_list.aggregate()
			.match({
				status: status
			}) // 根据 status 参数进行过滤
			.lookup({
				from: 'books',
				localField: 'book_id',
				foreignField: '_id',
				as: 'bookInfo'
			})
			.unwind('$bookInfo')
			.project({
				_id:1,
				book_id: 1,
				status: 1,
				borrowTime:1,
				returnBookTime:1,
				bookInfo: {
					BName: '$bookInfo.BName',
					Author: '$bookInfo.Author'
					// 添加其他您想选择性返回的 book 字段
				}
			})
			.end();
	}
	return {
		code: 1,
		data: res.data
	}
};