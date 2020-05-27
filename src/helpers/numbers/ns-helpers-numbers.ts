export function nsFormatFloatNumber(value: number, digits = 2): string {
   return value == null
          ? null
          : value.toLocaleString(undefined, { maximumFractionDigits: digits, useGrouping: false });
}

export function nsFormatNumber(value: number, digits = 2): string {
   return value == null
          ? null
          : value.toLocaleString(undefined, { minimumIntegerDigits: digits });
}

export function nsCalculatePercentage(value: number, percentage: number, decimals: number): number {
   let result = value * percentage / 100;
   result = nsRoundNumberDown(result, decimals);
   return result;
}

export function nsRoundNumberDown(value: number, decimals: number): number {
   return Number(Math.floor(Number(`${value}e${decimals}`)) + 'e-' + decimals);
}

export function nsRoundNumberUp(value: number, decimals: number): number {
   return Number(Math.ceil(Number(`${value}e${decimals}`)) + 'e-' + decimals);
}
