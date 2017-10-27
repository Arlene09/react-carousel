
import {
	REQUEST_PRODUCT_LIST,
	SUCCESS_REQUEST_PRODUCT_LIST,
	FAILURE_REQUEST_PRODUCT_LIST
} from './actions'

const initialState = {
	fetching: false,
	params: null,
	data: {
		productList: []
	},
	err: null
}

function productListReducer(state = initialState, action) {
	switch(action.type){
		case REQUEST_PRODUCT_LIST: {
			return Object.assign({}, state, {
				fetching: true,
				params: action.params
			})
		}
		case SUCCESS_REQUEST_PRODUCT_LIST: {
			return Object.assign({}, state, {
				fetching: false,
				data: action.data
			})
		}
		case FAILURE_REQUEST_PRODUCT_LIST: {
			return Object.assign({}, state, {
				fetching: false,
				err: action.err
			})
		}
		default: {
			return state
		}
	}
}


export default {
	productListReducer
}
