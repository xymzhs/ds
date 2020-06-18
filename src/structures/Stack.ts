// :O(n)
// export class Stack<T> {
//   private _iterms: T[] = [];

//   push = (e: T | T[]) => {
//     if (Array.isArray(e)) {
//       e.map((v) => this._iterms.push(v));
//     } else this._iterms.push(e);
//   };
//   pop = () => this._iterms.pop();

//   peak = () => this._iterms[this._iterms.length - 1];
//   isEmpty = () => this._iterms.length === 0;
//   clear = () => {
//     this._iterms = [];
//   };
//   size = () => this._iterms.length;
// }

// :O(1)
export class Stack<T> {
  private _count: number = 0;
  private _iterms: {
    [index: number]: T;
  } = {};

  push = (e: T) => {
    this._iterms[this._count] = e;
    this._count++;
  };
  pop = () => {
    if (this.isEmpty()) {
      return undefined;
    }
    this._count--;
    const result = this._iterms[this._count];
    delete this._iterms[this._count];
    return result;
  };

  peak = () => {
    if (this.isEmpty()) {
      return undefined;
    }
    return this._iterms[this._count - 1];
  };
  isEmpty = () => this._count === 0;
  clear = () => {
    this._iterms = {};
  };
  size = () => this._count;
  toString = () => {
      if(this.isEmpty()){
          return ""
      }
      let objString = `${this._iterms[0]}`
      for (let i = 0; i < this._count; i++) {
        objString = `${objString},${this._iterms[i]}`
      }
      return objString
  }
}
