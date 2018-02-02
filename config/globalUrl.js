// 全局变量
let env = process.env.NODE_ENV
if (env === 'production') {
  global.URL = 'http://weiju.00603.top/api/v1/'
  global.LOGINURL = 'http://weiju.00603.top/'
} else {
  global.URL = 'http://weiju.lindo.io/api/v1/'
  global.LOGINURL = 'http://weiju.lindo.io/'
}
