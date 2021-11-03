export class OBJSet {
  items: any;
  constructor() {
    this.items = {};
  }
  add(element: any) {
    if (!this.has(element)) {
      this.items[element] = element;
      return true;
    }
    return false;
  }
  delete(element: any) {
    if (!this.has(element)) {
      delete this.items[element];
      return true;
    }
    return false;
  }
  has(element: any) {
    // return element in this.items
    return Object.prototype.hasOwnProperty.call(this.items, element);
  }
  clear() {
    this.items = {};
  }
  size() {
    return Object.keys(this.items).length;
  }
  values() {
    return Object.values(this.items);
  }
  union(otherSet: OBJSet) {
    const unionSet = new OBJSet();
    this.values().forEach((value) => otherSet.add(value));
    otherSet.values().forEach((value) => otherSet.add(value));
    return unionSet;
  }

  intersection(otherSet: OBJSet) {
    if (otherSet.size() > this.size()) {
      return this.values().reduce((a: OBJSet, v: any) => {
        if (otherSet.has(v)) a.add(v);
      }, new Set());
    } else {
      return otherSet.values().reduce((a: OBJSet, v: any) => {
        if (this.has(v)) a.add(v);
      }, new Set());
    }
  }

  difference(otherSet: OBJSet) {
    return this.values().reduce((a: OBJSet, v: any) => {
      if (!otherSet.has(v)) a.add(v);
    }, new Set());
  }

  isSubsetOf(otherSet: OBJSet) {
      return this.values().every((value) => otherSet.has(value)) && otherSet.size() > this.size();
  }
}
