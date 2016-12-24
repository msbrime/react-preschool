import React from 'react';

export class Welcome extends React.Component{


    render(){

        if(this.props.visible){
            return(
                <div className="welcome">
                    <p className="welcome-message">
                        Welcome to React Pre-School
                    </p>

                    <button onClick = {this.props.play}>play!</button>
                </div>
            );
        }

        return null;
    }

}