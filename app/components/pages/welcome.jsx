import React from 'react';
import { Link } from 'react-router';

export default class Welcome extends React.Component{

    render(){
        return(
            <div className="welcome">
                <div className="welcome__inner">
                    <p className="welcome__message">
                        Welcome to React Pre-School
                        </p>

                    <Link to='/quiz'>
                        <button className="button">Play!</button>
                    </Link>
                </div>
            </div>
        );
    }

}