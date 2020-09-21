import React from 'react';

export default class ResetButton extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <button className="reset_button" onClick={this.props.reset} />
        );
    }
}