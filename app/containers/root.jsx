import React from 'react';
import routes from '../routes';
import { Provider } from 'react-redux';
import store from '../store';
import { Router,hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

let history = syncHistoryWithStore(hashHistory,store);

export default class Root extends React.Component{

    render(){
        return (
            <Provider store = {store}>
                <Router history = {history} routes ={routes} >
                </Router>
            </Provider>                            
        );
    }

}