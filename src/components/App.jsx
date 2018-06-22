import React from 'react';
import Table from './Table.jsx';
import isThereWinner from '../scripts/isThereWinner';
import fieldTemplate from '../scripts/fieldTemplate';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      turn: 'cross',
      field: fieldTemplate,
    }
  }

  onTurn = (id) => () => {
    const { turn, field } = this.state;

    const nextTurn = {
      cross: 'ring',
      ring: 'cross',
    };

    const newField = field.map(row => row.map(cell => cell.id === id ? { ...cell, value: turn } : cell));

    this.setState({ turn: nextTurn[turn], field: newField });
  }

  onReset = () => {
    this.setState({ field: fieldTemplate, turn: 'cross' });
  }

  render() {
    const { turn, field } = this.state;

    const { win, winner } = isThereWinner(field)

    const message = <p>{win ? `The winner is ${winner}` : `Now is ${turn}'s turn`}</p>;
    
    return (
      <div className="m-3 col-3">
        <Table field={field} onTurn={this.onTurn} />
        {message}
        <button type="button" className="btn btn-primary" onClick={this.onReset}>Start over</button>
      </div>
    )
  }
}
