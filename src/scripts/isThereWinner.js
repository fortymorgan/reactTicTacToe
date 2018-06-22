export default (field) => {
  const winConditions = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];

  const fieldStat = field.reduce((acc, row) => {
    return row.reduce((acc, cell) => {
      if (cell.value === 'cross') {
        return { ring: acc.ring, cross: [...acc.cross, cell.id] }
      } else if (cell.value === 'ring') {
        return { cross: acc.cross, ring: [...acc.ring, cell.id] }
      } else {
        return acc;
      }
    }, acc)
  }, { cross: [], ring: [] });

  return Object.keys(fieldStat).reduce((acc, sign) => {
    const isWinner = winConditions.some(condition => condition.every(cellNumber => fieldStat[sign].includes(cellNumber)));
    return isWinner ? { win: true, winner: sign } : acc
  }, { win: false, winner: 'none' });
};
