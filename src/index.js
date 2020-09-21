import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MineSweeper from './Minesweeper';

ReactDOM.render(
  <React.StrictMode>
    <div id="main">
      <MineSweeper />
    </div>
    </React.StrictMode>,
  document.getElementById('root')
);