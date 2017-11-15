
import React from 'react';
import ReactDOM from 'react-dom'

import { getTouchDirection } from '../../utils/common'

export default class Slide extends React.Component{
  constructor(){
    super()
    this.state={
      startX:"",
      startY:"",
      endX:"",
      endY:""
    }
  }
  touchStart(ev){
    this.setState({
      startX:ev.touches[0].pageX,
      startY:ev.touches[0].pageY
    })
  }

  touchEnd(ev){
    let that=this;

    this.setState({
      endX:ev.changedTouches[0].pageX,
      endY:ev.changedTouches[0].pageY
    }, () => {
      let direction = getTouchDirection(this.state.startX, this.state.startY, this.state.endX, this.state.endY);
      switch(direction) {
          case 0:
              console.log("没滑动");
              break;
          case 1:
              console.log("向上滑");
              break;
          case 2:
              console.log("向下滑");
              break;
          case 3:
              console.log("向右滑");
              that.props.change("toLeft")
              break;
          case 4:
              console.log("向左滑");
              that.props.change("toRight")
              break;
          default:
      }
    })
   
  }

  render(){

    const { imgSrc, link, active } = this.props
    let slideStyle = {
        backgroundImage: "url(" + imgSrc + ")"
    };
    return(
      <a href={link}>
        <div className="slider__slide" data-active={active} style={slideStyle} onTouchStart={ev=>{this.touchStart(ev)}} onTouchEnd ={ev=>{this.touchEnd(ev)}}>
        </div>
      </a>
    )
  }
}