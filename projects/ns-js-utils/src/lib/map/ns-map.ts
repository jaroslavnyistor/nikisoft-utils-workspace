import { nsIterateObjectProperties } from '../helpers/ns-helpers';

export class NsMap<TKey, TValue> {
  private readonly _internalMap = {};

  getOrCreate(key: TKey, creator: () => TValue): TValue {
    let value = this.get(key);

    if (value == null) {
      value = creator();
      this.push(key, value);
    }

    return value;
  }

  get(key: TKey): TValue {
    const internalKey = NsMap.getInternalKey(key);
    return this._internalMap[internalKey] || null;
  }

  push(key: TKey, value: TValue) {
    const internalKey = NsMap.getInternalKey(key);
    this._internalMap[internalKey] = value;
  }

  private static getInternalKey(key: any): string {
    return key.toString();
  }

  flat(): TValue[] {
    const result: TValue[] = [];

    nsIterateObjectProperties(this._internalMap, (prop) => {
      const value = this._internalMap[prop];
      result.push(value);
    });

    return result;
  }

  initializeFromArray(array: TValue[], keyCallback: (item: TValue) => TKey) {
    array.forEach((item) => {
      const key = keyCallback(item);
      this.push(key, item);
    });
  }
}
