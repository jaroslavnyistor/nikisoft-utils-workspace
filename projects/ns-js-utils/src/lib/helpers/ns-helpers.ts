import { nsIsNotNullOrEmpty, nsIsString } from './strings';

export function nsObjectIsNullValue(
  value: any,
  property: any,
  defaultValue: any
) {
  return value == null ? defaultValue : value[property];
}

export function nsObjectHasValue(value: any) {
  if (nsIsString(value)) {
    return nsIsNotNullOrEmpty(value as string);
  }

  return value != null;
}

export function nsIterateObjectProperties(
  value: any,
  callback: (prop: string, propValue: any) => void
) {
  for (const prop in value) {
    if (value.hasOwnProperty(prop)) {
      const propValue = value[prop];

      callback(prop, propValue);
    }
  }
}

export function nsFormatValue(value: any): string {
  if (nsIsNumber(value)) {
    return value;
  }

  if (nsIsBoolean(value)) {
    return value;
  }

  return `"${value}"`;
}

export function nsIsObject(value: any) {
  return typeof value === 'object';
}

export function nsIsNumber(value: any): boolean {
  return typeof value === 'number';
}

export function nsIsBoolean(value: any): boolean {
  return typeof value === 'boolean';
}

export function nsNull(value: any, nullValue: any) {
  return value == null ? nullValue : value;
}
