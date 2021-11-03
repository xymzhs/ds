
class Queue<T> {
    private _count: number = 0;
    private _iterms: {
      [index: number]: T;
    } = {};
  private _lowestCount: number = 0;
  enqueue(e: T) {
    this._iterms[this._count] = e;
    this._count++;
  }
  dequeue() {
    if (this.isEmpty()) {
      return undefined;
    }
    const result = this._iterms[this._lowestCount];   
    delete this._iterms[this._lowestCount];
    this._lowestCount ++
    return result;
  }
  peak(){
    if (this.isEmpty()) {
        return undefined;
      }
      return this._iterms[this._lowestCount]
  }
  isEmpty = () => this._count - this._lowestCount=== 0;
  clear = () => {
    this._iterms = {};
    this._count = 0
    this._lowestCount = 0
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
