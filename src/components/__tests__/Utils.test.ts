import Utils from '../Utils'

describe('selectionDropDownRange', () => {
  it('generates a range of numbers as expected', () => {
    const startNumber = 1
    const endNumber = 5
    const expectedOutput = [
      { label: '1', value: '1' },
      { label: '2', value: '2' },
      { label: '3', value: '3' },
      { label: '4', value: '4' },
      { label: '5', value: '5' },
    ]

    const result = Utils.selectionDropDownRange(startNumber, endNumber)

    expect(result).toEqual(expectedOutput)
  })

  it('returns an empty array if endNumber is less than startNumber', () => {
    const startNumber = 5
    const endNumber = 1

    const result = Utils.selectionDropDownRange(startNumber, endNumber)

    expect(result).toEqual([])
  })
})
