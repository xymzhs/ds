import { defaultEquals } from "./utils";
import { BaseStructure } from "./baseStructure";

export class Node<T> {
  constructor(public element: T, public next?: Node<T>) {}
}
export class LinkedList<T> implements BaseStructure {
  protected equalsFn: Function;
  protected head: Node<T>;
  protected count: number = 0;
  constructor(equalsFn: Function = defaultEquals) {
    this.equalsFn = equalsFn;
  }
  push(element: T) {
    const node = new Node<T>(element);
    let current;
    if (this.head) {
      current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    } else this.head = node;
    this.count++;
  }
  insert(element: T, index: number) {
    if (index >= 0 && index < this.count) {
      const node = new Node<T>(element);
      if (index === 0) {
        const current = this.head;
        node.next = current;
        this.head = node;
      } else {
        const previous = this.getElementAt(index - 1);
        const current = previous.next;
        node.next = current;
        previous.next = node;
      }
      this.count++;
      return true;
    }
    return false;
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
  indexOf(element: T) {
    let current = this.head;
    for (let i = 0; i < this.count && current; i++) {
      if (this.equalsFn(element, current.element)) {
        return i;
      }
      current = current.next;
    }
    return -1;
  }
  remove(element: T) {
    const index = this.indexOf(element);
    return this.removeAt(index);
  }
  removeAt(index: number) {
    if (index >= 0 && index < this.count) {
      let current = this.head;
      if (index === 0) {
        this.head = current.next;
      } else {
        const previous = this.getElementAt(index - 1);
        current = previous.next;
        previous.next = current.next;
      }
      this.count--;
      return current.element;
    }
    return undefined;
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
