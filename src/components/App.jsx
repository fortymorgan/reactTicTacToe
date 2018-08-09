import React from 'react';
import Table from './Table.jsx';
import isThereWinner from '../isThereWinner';
import fieldTemplate from '../fieldTemplate';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      turn: 'cross',
      field: fieldTemplate,
      fieldStat: {
        cross: [],
        ring: [],
      },
      win: false,
      winner: 'none',
    }
  }

  onTurn = (id) => () => {
    const { turn, field, fieldStat, win } = this.state;

    if (!win) {
      const nextTurn = {
        cross: 'ring',
        ring: 'cross',
      };
  
  
      const newField = field.map(row => row.map(cell => cell.id === id ? { ...cell, value: turn } : cell));
  
      const newFieldStat = turn === 'cross' ? ({ ...fieldStat, cross: [...fieldStat.cross, id] }) :
        ({ ...fieldStat, ring: [...fieldStat.ring, id] });
  
      const { isWin, winner } = isThereWinner(newFieldStat);

      this.setState({ turn: nextTurn[turn], field: newField, fieldStat: newFieldStat, win: isWin, winner });
    }
  }

  onReset = () => {
    this.setState({ field: fieldTemplate, turn: 'cross', fieldStat: { cross: [], ring: [] } });
  }

  render() {
    const { turn, field, win, winner } = this.state;

    const message = <p>{win ? `The winner is ${winner}` : `Now is ${turn}'s turn`}</p>;
    
    return (
      <div className="m-3">
        <h3 className="mb-3">Tic Tac Toe</h3>
        <Table field={field} onTurn={this.onTurn} />
        {message}
        <button type="button" className="btn btn-primary" onClick={this.onReset}>Start over</button>
      </div>
    )
  }
}
