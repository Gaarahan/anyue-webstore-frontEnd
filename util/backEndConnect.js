/**
 * 封装一个创建http后端请求参数的方法
 * @param method GET或POST请求 默认为POST
 * @param path  请求的路由
 * @param port  请求的端口，默认为8080
 */
module.exports = (path,method="POST",port=8080)=>{
  return {
    hostname: "47.94.108.73",
    method: method,
    path: path,
    headers: {
      'Content-Type': 'application/json;charset:utf-8',
    },
    port: port,
  }
};