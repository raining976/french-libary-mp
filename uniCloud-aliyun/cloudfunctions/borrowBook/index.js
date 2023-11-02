'use strict';
const db = uniCloud.database()
const bblist = db.collection("borrow_book_list")
const book = db.collection("books")
const _ = db.command
exports.main = async (event, context) => {
	const {
		user_id,
		book_id
	} = event

	let book_res = await book.doc(book_id).get()
	const BCount = book_res.data[0].BCount
	if (BCount == 0) {
		return {
			code: 0,
			msg: "这本书被借完了哦~"
		}
	} else {
		let bbres = await bblist.where({
			user_id,
			book_id,
			status: _.neq(2)
		}).get()

		if (bbres.data.length != 0) {
			return {
				code: 0,
				msg: "这本书你已经借过了哦"
			}
		} else {
			const data = {
				user_id,
				book_id,
				borrowTime: new Date().getTime(),
				returnBookTime: new Date().setMonth(new Date().getMonth() + 1),
				status: 0
			}
			await bblist.add(data)
			await book.doc(book_id).update({
				BCount:BCount-1
			})
			return {
				code: 1,
				msg: "OK啦,可以去图书室拿书啦"
			}
		}

	}
};