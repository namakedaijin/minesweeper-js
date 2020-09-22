import React from 'react';

export default class Cell extends React.Component{
    onCellClicked = () => {
        this.props.onCellClicked(this.props.stat);
    }
    onCellRightClicked = () => {
        this.props.onCellRightClicked(this.props.stat);
    }
    onDoubleClick = () => {
        this.props.onDoubleClicked(this.props.stat);
    }
    drawCell(){
        if(this.props.stat.isOpened){
           if(!this.props.stat.hasMine){
               let n = this.props.stat.number;
                return (
                    <div className="opened_cell" onClick={this.onCellClicked}
                    onContextMenu={(e) => {
                        e.preventDefault();
                    }}
                    onDoubleClick={this.onDoubleClick}>
                        {n===0? "": this.props.stat.number}
                    </div>
                );
           }
           else{
                return (
                    <div className="hasMine_cell" onClick={this.onCellClicked}
                    onContextMenu={(e) => {
                        e.preventDefault();
                    }}/>
                );
           }
        }else{
            if(this.props.stat.hasFlag){
                return (
                    <div className="hasFlag_cell" onClick={this.onCellClicked}
                    onContextMenu={(e) => {
                        e.preventDefault();
                        this.onCellRightClicked(this.props.stat);
                    }} />
                );
            }else{
                return (
                    <div className="closed_cell" onClick={this.onCellClicked}
                    onContextMenu={(e) => {
                        e.preventDefault();
                        this.onCellRightClicked();
                    }} />
                );
            }
        }
    }
    render(){
        return(
            this.drawCell()
        );
    }
}