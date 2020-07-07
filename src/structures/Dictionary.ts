import { defaultToString } from "./utils";
import { LinkedList } from "./LinkedList";
class ValuePair {
  key: any;
  value: any;
  constructor(key: any, value: any) {
    this.key = key;
    this.value = value;
  }
  toString() {
    return `[#${this.key}:${this.value}]`;
  }
}

export class Dictionary {
  table: any;
  toStrFn: Function;
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn;
    this.table = {};
  }
  hasKey(key: any) {
    return this.table[this.toStrFn(key)] != undefined;
  }
  set(key: any, value: any) {
    if (key != null || value != null) {
      const tableKey = this.toStrFn(key);
      this.table[tableKey] = new ValuePair(key, value);
      return true;
    }
    return false;
  }
  remove(key: any) {
    if (this.hasKey(key)) {
      delete this.table[this.toStrFn(key)];
      return true;
    }
    return false;
  }
  get(key: any) {
    const valuePair = this.table[this.toStrFn(key)];
    return valuePair == null ? undefined : valuePair.value;
  }

  keyValues(): ValuePair[] {
    return Object.values(this.table);
  }
  keys() {
    return this.keyValues().map((vp: ValuePair) => vp.key);
  }
  values() {
    return this.keyValues().map((vp: ValuePair) => vp.value);
  }
  forEach(callback: (key: any, value: any) => any) {
    this.keyValues().map((v) => callback(v.key, v.value));
  }
  clear() {
    this.table = {};
  }
  size() {
    return this.keys().length;
  }
  isEmpty() {
    return this.size() === 0;
  }
  toString() {
    if (this.size()) {
      const valuePair = this.keyValues();
      let objString = `${valuePair[0].toString()}`;
      for (let i = 1; i < valuePair.length; i++) {
        objString = `${objString},${valuePair[i].toString()}`;
      }
    } else return "";
  }
}

export class HashTable {
  table: any;
  toStrFn: Function;
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn;
    this.table = {};
  }
  put(key: any, value: any) {
    if (key != null && value != null) {
      const position = this.hashCode(key);
      this.table[position] = new ValuePair(key, value);
      return true;
    }
    return false;
  }
  remove(key: any) {
    const hash = this.hashCode(key);
    const valuePair = this.table[hash];
    if (valuePair != null) {
      delete this.table[hash];
      return true;
    }
    return false;
  }
  get(key: any) {
    const valuePair = this.table[this.hashCode(key)];
    return valuePair === null ? undefined : valuePair.value;
  }
  loseloseHashCode(key: any) {
    if (typeof key === "number") {
      return key;
    }
    const tableKey = this.toStrFn(key);
    let hash = 0;
    for (let i = 0; i < tableKey.length; i++) {
      hash += tableKey.charCodeAt(i);
    }
    return hash % 37;
  }

  hashCode(key: any) {
    return this.loseloseHashCode(key);
  }
  size() {
    return Object.keys(this.table).length;
  }
  isEmpty() {
    return this.size() == 0;
  }
  toString() {
    if (this.isEmpty()) {
      return "";
    }
    const keys = Object.keys(this.table);
    let objString = `{$${keys[0]} => ${this.table[keys[0]].toString()}}`;
    for (let i = 1; i < keys.length; i++) {
      objString = `${objString},{$${keys[0]} => ${this.table[
        keys[0]
      ].toString()}}`;
    }
    return objString;
  }
}

// 分离链接法解决冲突
export class HashTableSeparateChaining extends HashTable {
  put(key: any, value: any) {
    if (key != null && value != null) {
      const position = this.hashCode(key);
      if (this.table[position] == null) {
        this.table[position] = new LinkedList<ValuePair>();
      }
      this.table[position].push(new ValuePair(key, value));
      return true;
    }
    return false;
  }
  remove(key: any) {
    const position = this.hashCode(key);
    const linkedList = this.table[position];
    if (linkedList !== null && !linkedList.isEmpty()) {
      let current = linkedList.getHead();
      while (current != null) {
        if (current.element.key === key) {
          linkedList.remove(current.element);
          if (linkedList.isEmpty()) {
            delete this.table[position];
          }
          return true;
        }
        current = current.next;
      }
    }
    return false;
  }
  get(key: any) {
    const position = this.hashCode(key);
    const linkedList = this.table[position];
    if (linkedList !== null && !linkedList.isEmpty()) {
      let current = linkedList.getHead();
      while (current != null) {
        if (current.element.key === key) {
          return current.element.value;
        }
        current = current.next;
      }
    }
    return undefined;
  }
}

// 线性探查解决冲突
export class HashTableLinearProbingLazy extends HashTable {
  put(key: any, value: any) {
    if (key != null && value != null) {
      const position = this.hashCode(key);
      if (this.table[position] == null) {
        this.table[position] = new ValuePair(key, value);
      } else {
        let index = position + 1;
        while (this.table[index] != null) {
          index++;
        }
        this.table[index] = new ValuePair(key, value);
      }
      return true;
    }
    return false;
  }
  remove(key: any) {
    const position = this.hashCode(key);
    if (this.table[position] != null) {
      if (this.table[position].key === key) {
        delete this.table[position];
        this.verifyRemoveSideEffect(key, position);
        return true;
      }
      let index = position + 1;
      while (this.table[index] != null && this.table[index].key !== key) {
        index++;
      }
      if (this.table[index] != null && this.table[index].key === key) {
        delete this.table[position];
        this.verifyRemoveSideEffect(key, position);
        return true;
      }
    }
    return false;
  }
  verifyRemoveSideEffect(key: any, removedPosition: number) {
    const hash = this.hashCode(key);
    let index = removedPosition + 1;
    while (this.table[index] != null) {
      const posHash = this.hashCode(this.table[index].key);
      if (posHash <= hash || posHash <= removedPosition) {
        this.table[removedPosition] = this.table[index];
        delete this.table[index];
        removedPosition = index;
      }
      index++;
    }
  }
  get(key: any) {
    const position = this.hashCode(key);
    if (this.table[position] != null) {
      if (this.table[position].key === key) {
        return this.table[position].value;
      }
      let index = position + 1;
      while (this.table[index] != null && this.table[index].key !== key) {
        index++;
      }
      if (this.table[index] != null && this.table[index].key === key) {
        return this.table[position].value;
      }
    }
    return undefined;
  }
}
