import React from 'react';
import Board from './components/Board';
import Statusbar from './components/Statusbar';
import Message from './components/Message';

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
      openedCells: 0,
      status: "",
      mode: "Easy"
    };
  }

  initialize = (mode) => {
    this.setState((state) => {
      if(mode === "Easy"){
        return (
          {rows: 9,
          colums: 9,
          mines: 10,
          flags: 10}
        );
      }else if(mode === "Normal"){
        return (
          {rows: 16,
          colums: 16,
          mines: 40,
          flags: 40}
        );
      }else{
        return (
          {rows: 16,
          colums: 30,
          mines: 99,
          flags: 99}
        );
      }
    });
    this.setState({
      time: 0,
      run: false,
      openedCells: 0,
      status: "",
    });
  }

  onCellClicked = () => {
    if(this.state.run){
      this.setState((state) => {
        return {openedCells: state.openedCells + 1};
      });
    }
    if(!this.state.run && this.state.openedCells == 0){
      clearInterval(this.timer);
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

  changeMode = (mode) => {
    clearInterval(this.timer);
    this.setState({mode: mode});
    this.initialize(mode);
  }

  winAction = () => {
    this.setState({run: false, status: "win"});
    clearInterval(this.timer);
  }

  loseAction = () => {
    this.setState({run: false, status: "lose"});
    clearInterval(this.timer);
  }

  timeIncrement = () => {
    this.setState((state) => {
      return {time: state.time + 1};
    });
  }

  reset = () => {
    clearInterval(this.timer);
    this.initialize(this.state.mode);
  }

  componentWillUpdate = (nextProps, nextState) => {
    if((nextState.openedCells === (this.state.rows*this.state.colums-this.state.mines))&&nextState.run){
        this.winAction();
    }
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
            onCellRightClicked={this.onCellRightClicked}
            winAction={this.winAction}
            loseAction={this.loseAction}
            mode={this.state.mode}/>
          <Statusbar 
            time={this.state.time}
            flags={this.state.flags}
            run={this.state.run}
            reset={this.reset}
            mode={this.state.mode}
            onChangeMode={this.changeMode}/>
          <Message status={this.state.status}/>
        </div>
      </div>
    );
  }
}