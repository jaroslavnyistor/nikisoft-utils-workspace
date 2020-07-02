/**
 * Class which imitates dictionary-like map.
 */
import { NsObject } from './ns-object';

export class NsMap<TKey, TValue> {
  private readonly _internalMap = {};

  /**
   * Gets value based on provided key, if the key does not exists, then
   * creates the value and stores it in the map.
   * @param key Key
   * @param creator Function which creates a new value
   */
  getOrCreate(key: TKey, creator: () => TValue): TValue {
    let value = this.get(key);

    if (value == null) {
      value = creator();
      this.push(key, value);
    }

    return value;
  }

  /**
   * Gets the key. If the keys is not in map, returns null.
   * @param key Key
   */
  get(key: TKey): TValue {
    const internalKey = NsMap.getInternalKey(key);
    return this._internalMap[internalKey] || null;
  }

  /**
   * Pushes a new value for the given key. If there is already a value,
   * the value is overwritten.
   * @param key Key
   * @param value New value
   */
  push(key: TKey, value: TValue) {
    const internalKey = NsMap.getInternalKey(key);
    this._internalMap[internalKey] = value;
  }

  private static getInternalKey(key: any): string {
    return key.toString();
  }

  /**
   * Flats this instance to array where items are values from this map.
   */
  flat(): TValue[] {
    const result: TValue[] = [];

    NsObject.iterateProperties(this._internalMap, (prop) => {
      const value = this._internalMap[prop];
      result.push(value);
    });

    return result;
  }

  /**
   * Creates instance from array
   * @param array Array to use to populate the map
   * @param keyCallback Function called to get key for the value.
   */
  static fromArray<TKey, TValue>(array: TValue[], keyCallback: (item: TValue) => TKey): NsMap<TKey, TValue> {
    const map: NsMap<TKey, TValue> = new NsMap();

    array.forEach((item) => {
      const key = keyCallback(item);
      map.push(key, item);
    });

    return map;
  }
}
