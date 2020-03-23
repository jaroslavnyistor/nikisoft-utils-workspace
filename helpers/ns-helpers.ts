import { isBoolean, isNumber } from 'util';
import { nsIsNotNullOrEmpty, nsIsString } from './strings/ns-helpers-strings';

export function nsObjectHasValue(value: any) {
   if (nsIsString(value)) {
      return nsIsNotNullOrEmpty(value as string);
   }

   return value != null;
}

export function nsIterateObjectProperties(value: any, callback: (prop: string, propValue: any) => void) {
   for (const prop in value) {
      if (value.hasOwnProperty(prop)) {
         const propValue = value[prop];

         callback(prop, propValue);
      }
   }
}

export function nsIsObject(value: any) {
   return typeof value === 'object';
}

export function nsFormatValue(propValue: any): string {
   if (isNumber(propValue)) {
      return propValue;
   }

   if (isBoolean(propValue)) {
      return propValue;
   }

   return `"${propValue}"`;
}

export function nsNull(value: any, nullValue: any) {
   return value == null ? nullValue : value;
}
