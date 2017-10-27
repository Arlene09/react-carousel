
export const REQUEST_PRODUCT_LIST = 'REQUEST_PRODUCT_LIST'
export const SUCCESS_REQUEST_PRODUCT_LIST = 'SUCCESS_REQUEST_PRODUCT_LIST'
export const FAILURE_REQUEST_PRODUCT_LIST = 'FAILURE_REQUEST_PRODUCT_LIST'

export const requestProductList = (params) => {
	return {
		type: REQUEST_PRODUCT_LIST,
		params
	}
}

export const successRequestProductList = (data) => {
	return {
		type: SUCCESS_REQUEST_PRODUCT_LIST,
		data
	}
}

export const failureRequestProductList = (err) => {
	return {
		type: FAILURE_REQUEST_PRODUCT_LIST,
		err
	}
}