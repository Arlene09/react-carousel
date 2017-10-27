/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import { Component } from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom'

import ProductList from '../ProductList'


import '../../static/styles/base/common.css'

class App extends Component {

  render() {
    //显示隐藏 数据加载提示框
    const {fetching1,fetching2,fetching3} = this.props
    const fetching = fetching1 || fetching2 || fetching3
    if(window.qylAct && window.qylAct.showProgressDialog && window.qylAct.hideProgressDialog){
      if(fetching){
        window.qylAct.showProgressDialog()
      }else{
        window.qylAct.hideProgressDialog()
      }
    }
    
    return (
      <div className="root">
        <Helmet
          titleTemplate='%s'
          titleAttribute={{ itemprop: 'name', lang: 'en' }}
        />
        <Switch>
          <Route exact path="/" component={ProductList} />
        </Switch>
          
      </div>
    )
  }
}



function mapStateToProps(state){
  return{
    // fetching3: state.categoryReducer.fetching
  }
}

export default withRouter(connect(mapStateToProps)(App))
