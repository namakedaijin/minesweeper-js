import React from 'react';

export default class FlagCounter extends React.Component{
    render(){
        return (
            <div className="flag_counter">
                {this.props.flags}
            </div>
        );
    }
}