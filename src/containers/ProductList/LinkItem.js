import React from 'react'

export default class LinkItem extends React.Component{
	constructor(){
		super()
		this.handleClick = this.handleClick.bind(this)
	}

	handleClick(){

	}

	render(){
		return(
			<div onClick={this.handleClick}>
				
			</div>
		)
	}
}