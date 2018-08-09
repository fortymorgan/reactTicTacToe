import React from 'react';

const Row = (props) => {
  const { data, onTurn } = props;

  const signs = {
    none: 'e',
    cross: 'x',
    ring: 'o',
  }

  return (
    <tr>
      {data.map(({ id, value }) => value !== 'none' ? <td key={id}>{signs[value]}</td> :
        <td key={id} className="empty" onClick={onTurn(id)}>{signs[value]}</td>)}
    </tr>
  )
}

const Table = (props) => {
  const { field, onTurn } = props;

  return (
    <table className="table table-bordered">
      <tbody>
        {field.map((row, index) => <Row key={index} data={row} onTurn={onTurn} />)}
      </tbody>
    </table>
  )
}

export default Table;
