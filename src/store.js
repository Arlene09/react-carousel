
// import { fromJS } from 'immutable';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import createSagaMiddleware from 'redux-saga'
import reducers from './reducers'
import sagas from './sagas'


export default function configureStore(initialState = {}) {
  const history = createHistory()

  // saga middleware
  const sagaMiddleware = createSagaMiddleware()

  // 定义中间件
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history)
  ]

  const enhancers = [
    applyMiddleware(...middlewares),
  ]

  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

  const store = createStore(
    combineReducers(reducers),
    initialState,
    composeEnhancers(...enhancers)
  );

  // 注册sagas
  // console.log(sagas);
  sagas.map(sagaMiddleware.run)


  if(module.hot) {
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
