import React from 'react'
import { withRouter } from 'react-router'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import { requestProductList } from './actions'

import LinkItem from './LinkItem'
import Carousel from '../../components/carousel';

import style from './index.css';

class ProductList extends React.Component {

	constructor(){
		super()
	}

	componentWillMount(){
		this.props.requestProductList();
	}

	render(){
		const { productList } = this.props.productListReducer.data
		var slides = [{
	      imgSrc: "http://upload-images.jianshu.io/upload_images/971705-6d38b15221a904c9.jpg",
	      link: "http://upload-images.jianshu.io/upload_images/971705-6d38b15221a904c9.jpg"
	    }, {
	      imgSrc: "http://upload-images.jianshu.io/upload_images/971705-1ebf3743a7d163c7.jpg",
	      link: "http://upload-images.jianshu.io/upload_images/971705-1ebf3743a7d163c7.jpg"
	    }, {
	      imgSrc: "http://upload-images.jianshu.io/upload_images/971705-1158b127a710879a.jpg",
	      link:"http://upload-images.jianshu.io/upload_images/971705-1158b127a710879a.jpg"
	    }, {
	      imgSrc: "http://upload-images.jianshu.io/upload_images/971705-1ebf3743a7d163c7.jpg",
	      link: "http://upload-images.jianshu.io/upload_images/971705-1ebf3743a7d163c7.jpg"
	    },{
	    	imgSrc: "http://upload-images.jianshu.io/upload_images/971705-2c8d6d5d8d3b59bc.jpg",
	    	link: "http://upload-images.jianshu.io/upload_images/971705-2c8d6d5d8d3b59bc.jpg"
	    }
	    ];

		return (
			<div>
				<h1 className="title">react 轮播图</h1>
				<Carousel interval={100} number={slides.length} boxStyle="content" interval={4000}  slides= {slides} >  
          		</Carousel> 
				{
					productList.map( item => 
						<LinkItem />
					)
				}
			</div>

		)
	}


}

const mapStateToProps = (state, props) => {
	return {
		productListReducer: state.productListReducer
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		requestProductList: (params) => dispatch(requestProductList(params))
	}
}

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(ProductList))