class Constants {
  get Cells() {
    return Array.from(Array(9).keys());
  }
  get WinCombos() {
    return [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [6, 4, 2],
      [2, 5, 8],
      [1, 4, 7],
      [0, 3, 6]
    ];
  }
}

export default new Constants();
