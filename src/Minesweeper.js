import React from 'react';
import Board from './components/Board';
import Statusbar from './components/Statusbar';

export default class MineSweeper extends React.Component{
  constructor(){
    super();
    this.state = {
      rows: 9,
      colums: 9,
      mines: 10,
      flags: 10,
      time: 0,
      run: false,
      openedCells: 0
    };
  }

  initialize = () => {
    this.setState(
      {rows: 9,
      colums: 9,
      mines: 10,
      flags: 10,
      time: 0,
      run: false,
      openedCells: 0}
    );
  }

  onCellClicked = () => {
    if(this.state.run){
      this.setState((state) => {
        return {openedCells: state.openedCells + 1};
      });
    }
    if(!this.state.run && this.state.openedCells == 0){
      this.timer = setInterval(this.timeIncrement, 1000);
      this.setState((state) => {
        return {run: true,
                openedCells: state.openedCells + 1};
      });
    }
  }

  onCellRightClicked = (clickedCell) => {
    if(this.state.run){
      if(clickedCell.hasFlag){
        this.setState((state) => {
          return {flags: state.flags + 1};
        });
      }else{
        this.setState((state) => {
          return {flags: state.flags - 1};
        });
      }
    }
  }

  timeIncrement = () => {
    this.setState((state) => {
      return {time: state.time + 1};
    });
  }

  reset = () => {
    clearInterval(this.timer);
    this.initialize();
  }

  render(){
    return(
      <div id="wrapper">
        <div className="minesweeper">
          <Board
            rows={this.state.rows}
            colums={this.state.colums}
            mines={this.state.mines}
            openedCells={this.state.openedCells}
            run={this.state.run}
            onCellClicked={this.onCellClicked}
            onCellRightClicked={this.onCellRightClicked}/>
          <Statusbar 
            time={this.state.time}
            flags={this.state.flags}
            run={this.state.run}
            reset={this.reset}/>
        </div>
      </div>
    );
  }
}