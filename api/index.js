// API 接口集中管理
import callFunction from './http.js';
const API = {
  searchBooks: (keyword,Category,skipCount) => callFunction('searchBooks',{keyword,Category,skipCount}),
  getBookByID: (_id) => callFunction('getBookDataRow',{_id}),
  login:(userInfo)=> callFunction('login',{userInfo}),
  getUserInfoById:(_id) => callFunction("user",{action:"getUserInfo",data:{_id}}),
  checkIsExistUser:(_id) => callFunction("user",{action:"isExist",data:{_id}})
};

export default API;