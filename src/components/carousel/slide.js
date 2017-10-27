
import React from 'react';
import ReactDOM from 'react-dom'

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
    this.setState({
      endX:ev.changedTouches[0].pageX,
      endY:ev.changedTouches[0].pageY
    })
    var that=this;
    var direction = this.GetSlideDirection(this.state.startX, this.state.startY, this.state.endX, this.state.endY);
      switch(direction) {
          case 0:
              console.log("没滑动");
              break;
          case 1:
              console.log("向上");
              break;
          case 2:
              console.log("向下");
              break;
          case 3:
              console.log("向左");
              that.props.change("toLeft")
              break;
          case 4:
              console.log("向右");
              that.props.change("toRight")
              break;
          default:
      }
  }
  GetSlideAngle(dx, dy) {
    return Math.atan2(dy, dx) * 180 / Math.PI;
  }
  GetSlideDirection(startX, startY, endX, endY) {
    var dy = startY - endY;
    var dx = endX - startX;
    var result = 0;
    //如果滑动距离太短
    if(Math.abs(dx) < 2 && Math.abs(dy) < 2) {
        return result;
    }

    var angle = this.GetSlideAngle(dx, dy);
    if(angle >= -45 && angle < 45) {
        // result = 4;
        result = 3;
    }else if (angle >= 45 && angle < 135) {
        result = 1;
    }else if (angle >= -135 && angle < -45) {
        result = 2;
    }
    else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
        // result = 3;
        result = 4;
    }
    return result;
  }

  render(){

    let imgSrc = this.props.imgSrc;
    // var background = this.props.background;
    var link = this.props.link;
    var active = this.props.active;
    var slideStyle = {
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