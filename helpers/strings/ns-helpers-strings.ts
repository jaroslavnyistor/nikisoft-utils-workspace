export function nsStringLength(value: string) {
   return value == null ? 0 : value.length;
}

export function nsIsNullOrEmpty(value: string) {
   return value == null || value.length === 0;
}

export function nsIsNotNullOrEmpty(value: string) {
   return !nsIsNullOrEmpty(value);
}

export function nsNullOrEmpty(value: string, defaultValue: string) {
   return nsIsNullOrEmpty(value) ? defaultValue : value;
}

export function nsStringFormat(value: string, ...params: any[]) {
   let result = value;

   if (params != null) {
      params.forEach((param, index) => {
         if (nsIsNotNullOrEmpty(param)) {
            const replacement = `{{${index}}}`;
            result = result.replace(replacement, param);
         }
      });
   }

   return result;
}

export function nsJoin(separator: string, values: string[]) {
   let result = '';

   values.forEach(value => {
      if (nsIsNotNullOrEmpty(value)) {
         result += value;
         result += separator;
      }
   });

   if (result.length > separator.length) {
      result = result.slice(0, result.length - separator.length);
   }

   return result;
}

export function nsIsString(value: any) {
   return value != null && value.length !== undefined;
}

export function nsPrefixIfNotNullOrEmpty(value: string, prefix: string) {
   if (nsIsNullOrEmpty(value)) {
      return '';
   }

   return `${prefix}${value}`;
}

export function nsPostfixIfNotNullOrEmpty(value: string, postfix: string) {
   if (nsIsNullOrEmpty(value)) {
      return '';
   }

   return `${value}${postfix}`;
}

export function nsStringToNumber(value: string) {
   return value == null ? null : Number.parseFloat(value);
}

export function nsStringFirstUpper(value: string) {
   return value[0].toUpperCase() + value.substr(1);
}

export function nsHashCode(s: string) {
   let h;
   for (let i = 0; i < s.length; i++) {
      h = Math.imul(31, h) + s.charCodeAt(i) | 0;
   }

   return h;
}
