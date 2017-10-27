let Config = {}

if (process.env.NODE_ENV === 'production') {
  Config = {
  	//测试
  	//domain: 'http://192.168.200.20/qyl/feedback/index.html#'
  	//生产
  	domain: 'https://static.namifunds.com/qyl/feedback/index.html#'
  }
}else{
  Config = {
  	domain: 'http://192.168.111.59/#'
  }
}

export default Config
