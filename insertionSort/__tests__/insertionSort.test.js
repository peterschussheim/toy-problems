import insertionSort from '../insertionSort'

describe('insertionSort', () => {
  test('insertionSort should be defined', () => {
    expect(insertionSort).toBeDefined()
  })
  test('insertionSort should be a function', () => {
    expect(insertionSort).toBeInstanceOf(Function)
  })
  test('it sorts an array of numbers correctly', () => {
    const target = [2, 4, 5, 15, 19, 26, 27, 36, 46, 47]
    let unsorted = [5, 47, 15, 36, 26, 27, 2, 46, 4, 19]
    let sorted = insertionSort(unsorted)
    expect(sorted).toBe(target)
  })
})
