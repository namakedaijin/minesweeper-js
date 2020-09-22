import React from 'react';
import Timer from './Timer';
import ResetButton from './ResetButton';
import FlagCounter from './FlagCounter';
import Option from './Option';

export default class Statusbar extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="status_bar">
                <Timer 
                    time={this.props.time}
                    run={this.props.run}
                />
                <ResetButton
                    reset={() => this.props.reset()}
                />
                <Option 
                    mode={this.props.mode}
                    onChangeMode={this.props.onChangeMode}/>
                <FlagCounter 
                    flags={this.props.flags}
                />
            </div>
        );
    }
}