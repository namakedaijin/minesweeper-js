import React from 'react';
import Cell from './Cell';

export default class Row extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        //console.log("on render row");
        let cells = this.props.cells.map((cell, index) => {
            //console.log(cell);
            return (
                <Cell 
                    stat={cell}
                    key={index}
                    onCellClicked={this.props.onCellClicked}
                    onCellRightClicked={this.props.onCellRightClicked}
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