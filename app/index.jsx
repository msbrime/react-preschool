import React from 'react';
import ReactDOM from 'react-dom';
import routes from 'routes';
import { Provider } from 'react-redux';
import store from 'store';
import { Router,hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

let history = syncHistoryWithStore(hashHistory,store);

class Root extends React.Component{

    render(){
        return (
            <Provider store = {store}>
                <Router history = {history} routes ={routes} >
                    </Router>
            </Provider>                            
        );
    }

}

ReactDOM.render(<Root />,document.getElementById("app"));