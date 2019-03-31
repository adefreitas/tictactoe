import React from 'react';

import { Square } from './square.component';

export class Board extends React.PureComponent {
  renderRow(rowNumber) {
    const squares = [];
    for (let i = rowNumber*3; i < rowNumber*3 + 3; i++) {
      squares.push(this.renderSquare(i));
    }
    return (
      <div
        className="board-row"
        key={rowNumber}
      >
        {squares}
      </div>
    )
  }
  
  renderSquare(i) {
    return <Square
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
    />
  }

  render() {
    const rows = [];
    for (let i = 0; i < 3; i ++) {
      rows.push(this.renderRow(i));
    }
    return (
      <div className="board">
        {rows}
      </div>
    );
  }
}

