import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from 'store'
import App from 'components/app.jsx'
import { HashRouter } from 'react-router-dom'

// let history = syncHistoryWithStore(hashHistory, store)

const Root = () => (
  <Provider store = {store}>
    <HashRouter ><App /></HashRouter>
  </Provider>
)

const root = createRoot(document.getElementById('app'));
root.render(<Root />);
