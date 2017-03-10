import isbnChecker from '../isbnChecker';

describe('isbnChecker', () => {
  test('Exists', () => {
    expect(isbnChecker).toBeDefined();

    test('is is a function', () => {
      expect(isbnChecker).toBeInstanceOf(Function);
    });
  });
});
