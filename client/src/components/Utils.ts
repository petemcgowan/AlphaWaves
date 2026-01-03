const selectionDropDownRange = function (
  startNumber: number,
  endNumber: number,
) {
  const numbers = [];
  // startNumber = startNumber || 80;
  while (startNumber <= endNumber) {
    numbers.push({
      label: startNumber.toString(),
      value: startNumber.toString(),
    });
    startNumber++;
  }
  return numbers;
};

export default {selectionDropDownRange};
