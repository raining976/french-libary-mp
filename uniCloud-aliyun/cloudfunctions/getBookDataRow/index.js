'use strict';
const db = uniCloud.database()
const _ = db.command

const bookDB = db.collection("books")
exports.main = async (event, context) => {
	const {_id} = event
	let res = bookDB.doc(_id).get()
	return res
};
