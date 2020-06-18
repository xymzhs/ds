class Deque<T> {
  private _count: number = 0;
  private _iterms: {
    [index: number]: T;
  } = {};
  private _lowestCount: number = 0;
  addFront(e: T) {
    if (this.isEmpty()) {
      this.addBack(e);
    } else if (this._lowestCount > 0) {
      this._lowestCount--;
      this._iterms[this._lowestCount] = e;
    } else {
      for (let i = this._count; i > 0; i--) {
        this._iterms[i] = this._iterms[i - 1];
      }
      this._count++;
      this._lowestCount = 0;
      this._iterms[0] = e;
    }
  }
  removeFront(e: T) {
    if (this.isEmpty()) {
      return undefined;
    }
    const result = this._iterms[this._lowestCount];
    delete this._iterms[this._lowestCount];
    this._lowestCount++;
    return result;
  }
  addBack(e: T) {
    this._iterms[this._count] = e;
    this._count++;
  }
  removeBack(e: T) {
    if (this.isEmpty()) {
      return undefined;
    }
    this._count--;
    const result = this._iterms[this._count];
    delete this._iterms[this._count];
    return result;
  }
  peakFront() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this._iterms[this._lowestCount];
  }
  peakBack() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this._iterms[this._count - 1];
  }
  isEmpty = () => this._count - this._lowestCount === 0;
  clear = () => {
    this._iterms = {};
    this._count = 0;
    this._lowestCount = 0;
  };
  size = () => this._count - this._lowestCount;
  toString = () => {
    if (this.isEmpty()) {
      return "";
    }
    let objString = `${this._iterms[this._lowestCount]}`;
    for (let i = this._lowestCount + 1; i < this._count; i++) {
      objString = `${objString},${this._iterms[i]}`;
    }
    return objString;
  };
}
