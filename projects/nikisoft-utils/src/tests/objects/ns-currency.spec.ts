import { NsCurrency } from '../../lib/objects/ns-currency';

describe('NsCurrency', () => {
  it('should format number to EUR currency', function () {
    const expected = '€10.00';
    const actual = NsCurrency.formatToEur(10);

    expect(actual).toBe(expected);
  });

  it('should return null when number is null', function () {
    const expected = null;
    const actual = NsCurrency.formatToEur(null);

    expect(actual).toBe(expected);
  });
});
