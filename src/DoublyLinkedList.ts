import { defaultEquals } from "./utils";
import { BaseStructure } from "./baseStructure";

export class DoublyNode<T> {
  constructor(
    public element: T,
    public next?: DoublyNode<T>,
    public prev?: DoublyNode<T>
  ) {}
}

export class DoublyLinkedList<T> implements BaseStructure {
  protected tail: DoublyNode<T>;
  protected equalsFn: Function;
  protected head: DoublyNode<T>;
  protected count: number = 0;
  constructor(equalsFn: Function = defaultEquals) {
    this.equalsFn = equalsFn;
  }
  insert(element: T, index: number) {
    if (index >= 0 && index <= this.count) {
      const node = new DoublyNode(element);
      let current = this.head;
      if (index === 0) {
        if (this.head == null) {
          this.head = node;
          this.tail = node;
        } else {
          node.next = this.head; 
          current.prev = node; 
          this.head = node;
        }
      } else if (index === this.count) {
        current = this.tail; 
        current.next = node; 
        node.prev = current; 
        this.tail = node; 
      } else {
        const previous = this.getElementAt(index - 1); 
        current = previous.next; 
        node.next = current; 
        previous.next = node; 
        current.prev = node; 
        node.prev = previous;
      }
      this.count++;
      return true;
    }
    return false;
  }
  removeAt(index:number) {
    if (index >= 0 && index < this.count) {
      let current = this.head;
      if (index === 0) {
        this.head = current.next; 
        // 如果只有一项，更新tail
        if (this.count === 1) { 
          this.tail = undefined;
        } else {
          this.head.prev = undefined; 
        }
      } else if (index === this.count - 1) { 
        current = this.tail;
        this.tail = current.prev; 
        this.tail.next = undefined; 
      } else {
        current = this.getElementAt(index);
        const previous = current.prev; 
        // 将previous与current的下一项链接起来——跳过current
        previous.next = current.next; 
        current.next.prev = previous; 
      }
      this.count--;
      return current.element;
    }
    return undefined 
  }
  getElementAt(index: number) {
    if (index >= 0 && index < this.count) {
      let node = this.head;
      for (let i = 0; i < index && node; i++) {
        node = node.next;
      }
      return node;
    }
    return undefined;
  }
  getTail() {
    return this.tail;
  }
  getHead() {
    return this.head;
  }
  isEmpty() {
    return this.size() === 0;
  }
  size() {
    return this.count;
  }
  toString() {
    if (this.head) {
      let objString = `${this.head.element}`;
      let current = this.head.next;
      for (let i = 1; i < this.size() && current; i++) {
        objString = `${objString},${current.element}`;
        current = current.next;
      }
      return objString;
    } else return "";
  }
}
