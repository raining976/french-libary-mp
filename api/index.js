// API 接口集中管理
import callFunction from './http.js';
const API = {
  searchBooks: (keyword,Category,skipCount) => callFunction('searchBooks',{keyword,Category,skipCount}),
  getBookByID: (_id) => callFunction('getBookDataRow',{_id}),
};

export default API;