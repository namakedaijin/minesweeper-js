import React from 'react';
import Row from './Row';
import _ from 'lodash';

export default class Board extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            board: this.createBoard(props)
        };
    }

    createBoard = (props) => {
        let board = [];
        for(let i = 0; i < props.rows; i++){
            board.push([]);
            for(let j = 0; j < props.colums; j++){
                board[i].push({
                    x: j,
                    y: i,
                    number: 0,
                    isOpened: false,
                    hasMine: false,
                    hasFlag: false
                });
            }
        }
        return board;
    }

    reset = (nextProps) => {
        let newBoard = this.createBoard(nextProps);
        this.updateBoardState(newBoard);
    }

    openCell = (clickedCell) => {
        this.props.onCellClicked();
        let copyBoard = this.getCopyBoard();
        let cell = copyBoard[clickedCell.y][clickedCell.x];
        if(this.props.openedCells === 0 && !this.props.run){
            this.setMines(copyBoard, cell);
        }
        if(!cell.isOpened && !cell.hasFlag){
            cell.isOpened = true;
            if(cell.number === 0){
                this.openRecursive(copyBoard, cell);
            }
            this.updateBoardState(copyBoard);
        }
    }

    openRecursive = (copyBoard, cell) => {
        if(cell.number === 0){
            for(let i = -1; i <= 1; i++){
                for(let j = -1; j <= 1; j++){
                    if((cell.x + j >= 0)&&(cell.x + j <= this.props.colums-1)
                        &&(cell.y + i >= 0)&&(cell.y + i <= this.props.rows-1)
                        &&(i != 0 || j != 0)){
                            let aroundCell = copyBoard[cell.y+i][cell.x+j];
                            if(!aroundCell.isOpened && !aroundCell.hasFlag){
                                aroundCell.isOpened = true;
                                this.openRecursive(copyBoard, aroundCell);
                            }
                        }
                }
            }
        }
    }

    setMines = (board, clickedCell) => {
        let mines = this.props.mines;
        let copyBoard = board;
        loop: while(mines != 0){
            let randX = Math.floor(Math.random() * this.props.colums);
            let randY = Math.floor(Math.random() * this.props.rows);
            for(let i = -1; i <= 1; i++){
                for(let j = -1; j <= 1; j++){
                    if(randX === clickedCell.x + j && randY === clickedCell.y + i){
                        continue loop;
                    }
                }
            }
            let randomCell = copyBoard[randY][randX];
            if(!randomCell.hasMine){
                randomCell.hasMine = true;
                mines--;
                for(let i = -1; i <= 1; i++){
                    for(let j = -1; j <= 1; j++){
                        if((randX + j >= 0)&&(randX + j <= this.props.colums-1)
                        &&(randY + i >= 0)&&(randY + i <= this.props.rows-1)
                        &&(i != 0 || j != 0)){
                            let aroundCell = copyBoard[randY + i][randX + j];
                            aroundCell.number++;
                        }
                    }
                }
            }
        }
    }

    onDoubleClicked = (clickedCell) => {
        let copyBoard = this.getCopyBoard();
        let cell = copyBoard[clickedCell.y][clickedCell.x];
        if(this.countAroundFlag(copyBoard, cell) === cell.number){
            for(let i = -1; i <= 1; i++){
                for(let j = -1; j <= 1; j++){
                    if((cell.x + j >= 0)&&(cell.x + j <= this.props.colums-1)
                        &&(cell.y + i >= 0)&&(cell.y + i <= this.props.rows-1)
                        &&(i != 0 || j != 0)){
                            let aroundCell = copyBoard[cell.y+i][cell.x+j];
                            if(!aroundCell.isOpened && !aroundCell.hasFlag){
                                aroundCell.isOpened = true;
                                this.openRecursive(copyBoard, aroundCell);
                            }
                        }
                }
            }
            this.updateBoardState(copyBoard);
        }
    }

    requestFlagToCell = (clickedCell) => {
        this.props.onCellRightClicked(clickedCell);
        if(this.props.run){
            let copyBoard = this.getCopyBoard();
            let cell = copyBoard[clickedCell.y][clickedCell.x];
            if(cell.hasFlag){
                cell.hasFlag = false;
            }else{
                cell.hasFlag = true;
            }
            this.updateBoardState(copyBoard);
        }
    }

    countAroundFlag = (board, cell) => {
        let flagCount = 0;
        for(let i = -1; i <= 1; i++){
            for(let j = -1; j <= 1; j++){
                if((cell.x + j >= 0)&&(cell.x + j <= this.props.colums-1)
                    &&(cell.y + i >= 0)&&(cell.y + i <= this.props.rows-1)
                    &&(i != 0 || j != 0)){
                        let aroundCell = board[cell.y+i][cell.x+j];
                        if(aroundCell.hasFlag){
                            flagCount++;
                        }
                    }
            }
        }
        return flagCount;
    }

    getCopyBoard = () => {
        return _.cloneDeep(this.state.board);
    }

    updateBoardState = (nextBoard) => {
        this.setState({board: nextBoard});
    }

    componentWillUpdate = (nextProps) => {
        if(this.props.openedCells != 0 && nextProps.openedCells == 0){
            this.reset(nextProps);
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        return !_.isEqual(nextState.board, this.state.board)
                ||(this.props.openedCells!=nextProps.openedCells);
    }

    render(){
        let rows = this.state.board.map((row, index) => {
            return(
                <div id="wrapper" key={index}>
                    <Row 
                        cells={row}
                        key={index}
                        onCellClicked={this.openCell}
                        onCellRightClicked={this.requestFlagToCell}
                        onDoubleClicked={this.onDoubleClicked}
                    />
                </div>
            );
        });
        return(
            <div className="board">
                {rows}
            </div>
        );
    }
}