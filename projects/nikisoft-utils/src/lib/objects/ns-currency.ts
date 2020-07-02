const formatterSettings = {
  style: 'currency',
  currencyDisplay: 'symbol',
  currency: 'EUR',
};

/**
 * Set of functions which help to work with currencies.
 */
export class NsCurrency {
  /**
   * Formats the number as currency
   * @param value
   */
  static formatToEur(value: number): string {
    return value == null ? null : value.toLocaleString(undefined, formatterSettings);
  }
}
