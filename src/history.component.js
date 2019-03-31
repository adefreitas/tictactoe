import React from 'react';

export class History extends React.Component {
  render() {
    const moves = this.props.actions.map((step, move) => {
			const desc = move ? 
				`Go to move #${move}` :
				'Go to game start';
			return (
				<div
          className="history-item"
          key={move}
          onClick={() => this.props.onClick(move)}
        >
				  {desc}
				</div>
				)
      });
      return (
        <div>
          <p>Previous moves</p>
          {moves}
        </div>
      )
  }
}