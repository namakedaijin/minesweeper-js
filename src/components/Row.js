import React from 'react';
import Cell from './Cell';

export default class Row extends React.Component{
    render(){
        let cells = this.props.cells.map((cell, index) => {
            return (
                <Cell 
                    stat={cell}
                    key={index}
                    onCellClicked={this.props.onCellClicked}
                    onCellRightClicked={this.props.onCellRightClicked}
                    onDoubleClicked={this.props.onDoubleClicked}
                />
            );
        });
        return(
            <div className="row">
                {cells}
            </div>
        );
    }
}