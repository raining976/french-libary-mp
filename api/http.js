// http.js
const callFunction = async (name, data = {}) => {
  try {
    const res = await uniCloud.callFunction({
      name: name,
      data: data
    });
    return res.result;
  } catch (error) {
    console.error(`调用云函数 ${name} 失败：`, error);
    throw error;
  }
};
export default callFunction;

