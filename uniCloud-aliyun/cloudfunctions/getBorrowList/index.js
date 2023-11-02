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
		res = await borrow_list.aggregate().lookup({
				from: 'books',
				localField: 'book_id',
				foreignField: '_id',
				as: "bookInfo"
			})
			.replaceRoot({
				newRoot: $.mergeObjects([$.arrayElemAt(['$bookInfo', 0]), '$$ROOT'])
			})
			.project({
				bookInfo:0,
			
			})
			.end()
	} else {
		res = await borrow_list.aggregate().lookup({
			from: 'books',
			localField: 'book_id',
			foreignField: '_id',
			as: "bookInfo"
		}).end()
	}
	return {
		code: 1,
		data: res.data
	}
};