let Config = {}

//测试
//const domain = 'http://139.196.243.223'

//预生产
//const domain = 'http://192.168.200.20'

//生产
const domain = 'https://api.namifunds.com'

if (process.env.NODE_ENV === 'production') {
  Config = {
  	requestProductList: domain + '/appfrontservice/app/user/queryFeedPage',
  }
}else{
  Config = {
  	requestProductList: domain + '/appfrontservice/app/user/queryFeedPage',
  }
}

export default Config
