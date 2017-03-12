import React from 'react';
import { Link } from 'react-router';
import store from "../store";

export default class Welcome extends React.Component{

    render(){
        return(
            <div className="welcome">
                <p className="welcome-message">
                    Welcome to React Pre-School
                    </p>

                <Link to='/quiz'>
                    <button>play!</button>
                </Link>
            </div>
        );
    }

}