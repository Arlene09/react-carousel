
import React from 'react';
import ReactDOM from 'react-dom'

import './carousel.css'

import Slide from './slide.js'

const carousel = React.createClass({
  propsTypes:{
    interval:React.PropTypes.number,
    autoPlay:React.PropTypes.bool,
    activeIndex:React.PropTypes.bool,
    defaultActiveIndex:React.PropTypes.bool,
    direction:React.PropTypes.oneOf['right','left'],
    number:React.PropTypes.number,
    boxStyle:React.PropTypes.string,
  },
  getDefaultProps(){
    return{
      interval:3000,
      autoPlay:true,
      defaultActiveIndex:0,
      direction:'right'
    }
  },
  getInitialState(){
    return{
      activeIndex:this.props.defaultActiveIndex?this.props.defaultActiveIndex:0,
      direction:this.props.direction?this.props.direction:'right'
    }
  },
  componentDidMount(){
    this.autoPlay();
  },
  componentWillReceiveProps (){

  },
  componentWillUnmount(){
    clearInterval(this.timeOuter);
  },
  autoPlay(){
    if(this.props.autoPlay){
      if(this.props.direction==="right"){
        this.timeOuter=setInterval(this.playRight,this.props.interval);
      }else if(this.props.direction==="left"){
        this.timeOuter=setInterval(this.playLeft,this.props.interval);
      }
    }
  },
  playRight(indexIn){
      let index=indexIn?indexIn:this.state.activeIndex+1;
      // console.log(index);
      if(index>this.props.number-1){
        index=0;
      }
      this.setState({
        activeIndex:index
      })
  },
  playLeft(indexIn){
      let index=indexIn?indexIn:this.state.activeIndex-1;
      // console.log(index);
      if(index<0){
        index=this.props.number-1;
      }
      this.setState({
        activeIndex:index
      })
  },
  position(){
    switch (this.state.activeIndex){
      case 0:return "onePosition" ;
      case 1:return "twoPosition" ;
      case 2:return "therePosition" ;
      case 3:return "fourPosition";
      case 4:return "fivePosition";
    }
  },
  left(){
   clearInterval(this.timeOuter);
    let oldIndex=this.props.activeIndex;
    this.playLeft(oldIndex+1);
    this.autoPlay();
  },
  right(){
    clearInterval(this.timeOuter);
    let oldIndex=this.props.activeIndex;
    this.playRight(oldIndex-1);
    this.autoPlay();
  },
  onChildChange(newVal){
    var that=this;
    if(newVal=="toLeft"){
      that.left()
    }else if(newVal=="toRight"){
      that.right()
    }
  },
  changeActiveIndex(index){
    this.setState({
      activeIndex:index
    })
  },
  render(){
    let _this = this;
    let slides = this.props.slides;
    let slide=slides.map(function(slide, index, array){
      return(
        <Slide active={index === _this.state.activeIndex} imgSrc={slide.imgSrc} link={slide.link} key={index} change={_this.onChildChange} this={_this}/>
      )
    })

    let doats =slides.map(function(slide, index, array){
      return(
        <span className={index == _this.state.activeIndex ? 'actived': ''} onClick={_this.changeActiveIndex.bind(_this, index)} ></span>
      )
    })

    let{
        interval,
        autoPlay,
        activeIndex,
        defaultActiveIndex,
        direction,
        number,
        boxStyle
      }=this.props;
    return (
      <div  className={boxStyle} >
        <span className="leftIcon" onClick={this.left}>left</span>
        <span className="rightIcon" onClick={this.right}>right</span>
        <ul className={this.position()}>
          {slide}
        </ul>
        <div className="doats_box">
          {doats}
        </div>
      </div>
    )
  }
});

export default carousel;

