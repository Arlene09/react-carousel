
import { call, put, takeEvery } from 'redux-saga/effects'

import request from '../../utils/request'
import apiConfig from '../../config/api'

import { 
	REQUEST_PRODUCT_LIST,
	successRequestProductList,
	failureRequestProductList
} from './actions'

export function* requestProductList(action) {
	let options = {
		method: 'POST',
		body: action.params
	}

	try{
		const data = yield call(request, apiConfig.requestProductList, options)
		if(data.code == 0){
			yield put(successRequestProductList(data.data))
		}else{
			if(window.qylAct){
	      		window.qylAct.showToast('查询数据失败：' + data.msg)
	      	}
	      	yield put(failureRequestProductList(data.msg))
		}

	} catch(err) {
		yield put(failureRequestProductList(err))
	}
}

export function* handleRequestProductList(){
	yield takeEvery(REQUEST_PRODUCT_LIST, requestProductList)
}

export default [
	handleRequestProductList
]