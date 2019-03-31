import React from 'react';

import { Board } from './board.component';
import { History } from './history.component';

export class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			history: [{
				squares: Array(9).fill(null),
			}],
			xIsNext: true,
			stepNumber: 0,
		}
	}

	calculateWinner(squares) {
		const lines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];
		for (let i = 0; i < lines.length; i++) {
			const [a, b, c] = lines[i];
			if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
				return squares[a];
			}
		}
		return null;
	}
	
	jumpTo(step) {
		this.setState({
			stepNumber: step,
			xIsNext: (step % 2) === 0,
		});
	}
	
	handleClick(i) {
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length - 1];
		const squares = current.squares.slice();
		if (this.calculateWinner(squares) || squares[i]) {
			return;
		}
		squares[i] = this.state.xIsNext ? 'X' : 'O';
		this.setState({
			history: history.concat([{
				squares: squares
			}]),
			xIsNext: !this.state.xIsNext,
			stepNumber: history.length,
		})
	}
	
	render() {
		const history = this.state.history;
		const current = history[this.state.stepNumber];
		const winner = this.calculateWinner(current.squares);
		let status;
		const whoIsNext = this.state.xIsNext ? 'X' : 'O';
	
		if (winner) {
			status = <div>
				<span className={winner}>{winner}</span> wins the game!
			</div>;
		} else {
			status = <div>
				<span className={whoIsNext}>{whoIsNext}</span> 's turn
			</div>;
		}

		return (
			<div className="game">
				<div className="game-board">
					<p className="text-center">
						{status}
					</p>
					<Board
						squares={current.squares}
						onClick={i => this.handleClick(i)}
					/>
				</div>
				<div className="game-history">
					<History
						actions={this.state.history}
						onClick={i => this.jumpTo(i)}
					/>
				</div>
			</div>
		)
	}
}
