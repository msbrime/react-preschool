import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from 'store'
import App from 'components/app.jsx'
import { HashRouter } from 'react-router-dom'

// let history = syncHistoryWithStore(hashHistory, store)

//  la vie en rose

const Root = () => (
  <Provider store = {store}>
    <HashRouter ><App /></HashRouter>
  </Provider>
)

ReactDOM.render(<Root />, document.getElementById('app'))
