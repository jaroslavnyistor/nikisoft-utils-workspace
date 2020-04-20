const formatterSettings = {
   style: 'currency',
   currencyDisplay: 'symbol',
   currency: 'EUR',
};

export function nsFormatCurrencyAmount(value: number) {
   return value == null
      ? null
      : value.toLocaleString(undefined, formatterSettings);
}
