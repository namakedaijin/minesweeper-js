import React from 'react';

export default class Message extends React.Component{
    render(){
        if(this.props.status === "win"){
            return (
                <div className="message">
                    YOU WIN
                </div>
            );
        }else if(this.props.status === "lose"){
            return (
                <div className="message">
                    YOU LOSE
                </div>
            );
        }else{
            return false;
        }
    }    
}