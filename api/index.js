// API 接口集中管理
import callFunction from './http.js';
const API = {
  searchBooks: (keyword,Category,skipCount) => callFunction('searchBooks',{keyword,Category,skipCount}),
  getBookByID: (_id) => callFunction('getBookDataRow',{_id}),
  login:(userInfo)=> callFunction('login',{userInfo}),
  getUserInfoById:(_id) => callFunction("user",{action:"getUserInfo",data:{_id}}),
  checkIsExistUser:(_id) => callFunction("user",{action:"isExist",data:{_id}}),
  submitStuAuth:(user_id,stuInfo) => callFunction('stuAuth',{user_id,stuInfo}),
  getStuInfo:(user_id) => callFunction("user",{action:"getStuInfo",data:{user_id}}),
  sumbitBorrowBook: (user_id,book_id) => callFunction("borrowBook",{user_id,book_id}),
  getBorrowList :(user_id,status) => callFunction("getBorrowList",{user_id,status})
};

export default API;