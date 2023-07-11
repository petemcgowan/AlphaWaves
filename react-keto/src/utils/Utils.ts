const selectionDropDownRange = function (
  startNumber: number,
  endNumber: number
): { label: string; value: string }[] {
  const numbers: { label: string; value: string }[] = []
  // startNumber = startNumber || 80;
  while (startNumber <= endNumber) {
    numbers.push({
      label: startNumber.toString(),
      value: startNumber.toString(),
    })
    startNumber++
  }
  return numbers
}

export default { selectionDropDownRange }
