'use strict';
const db = uniCloud.database()
const _ = db.command
const bookDB = db.collection("books")

exports.main = async (event, context) => {
	const {
		keyword,
		Category,
		skipCount
	} = event
	let res = searchBooks(keyword, Category, skipCount)
	return res
};

// 查询图书
async function searchBooks(keyword, Category, skipCount, pageSize = 10) {
	// 两个匹配模糊查询的字段：BName和Author，用正则匹配
	var query = [{
			BName: new RegExp(keyword)
		},
		{
			Author: new RegExp(keyword)
		}
	]
	var cateQuery = {}
	// 如果分类字段不为空则添加分类字段的匹配
	if (Category) cateQuery.Category = Category
	let res = await bookDB.where(_.or(query).and(cateQuery)).skip(skipCount).limit(pageSize).
	field({
		_id: true,
		BName: true,
		Author: true,
		BCount: true
	}).get()
	return {
		code: 20000,
		data: res.data,
		msg: "成功"
	}

}