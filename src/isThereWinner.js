export default (fieldStat) => {
  const winConditions = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];

  return Object.keys(fieldStat).reduce((acc, sign) => {
    const isWinner = winConditions.some(condition => condition.every(cellNumber => fieldStat[sign].includes(cellNumber)));
    return isWinner ? { isWin: true, winner: sign } : acc
  }, { isWin: false, winner: 'none' });
};
