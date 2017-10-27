

// Need for redux-saga es6 support
import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { Route, Switch, applyRouterMiddleware, HashRouter, history } from 'react-router-dom'
import { syncHistoryWithStore } from 'react-router-redux';
import Helmet from 'react-helmet'
import configureStore from './store'
import App from './containers/App'

const initialState = {};
const store = configureStore()

// Sync history and store, as the react-router-redux reducer
// is under the non-default key ("routing"), selectLocationState
// must be provided for resolving how to retrieve the "route" in the state
// const history = syncHistoryWithStore(browserHistory, store, {
//   selectLocationState: makeSelectLocationState(),
// });

const render = (Component) => {
	ReactDOM.render(
	  <Provider store={ store }>
	    <HashRouter>
	      <Component />
	    </HashRouter>
	  </Provider>,
	document.getElementById('app'))
}

render(App);

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    render(App)
  });
}
