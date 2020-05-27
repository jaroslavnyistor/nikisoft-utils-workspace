export function nsArrayIsEmpty(value: any[], count = 0) {
   return nsArrayHasItems(value, count) === false;
}

export function nsArrayHasItems(value: any[], count = 0) {
   return value != null && value.length > count;
}

export function nsArrayItemAt(value: any[], idx: number) {
   if (nsArrayHasItems(value, idx)) {
      return value[idx];
   }

   return undefined;
}
