let Config = {}

const domain = 'https://XXXX.com'

if (process.env.NODE_ENV === 'production') {
  Config = {
  	requestProductList: domain + '/requestProductList',
  }
}else{
  Config = {
  	requestProductList: domain + '/requestProductList',
  }
}

export default Config
