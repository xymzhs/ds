// A linked list is a collection of entities which are not stored in sequential order. Instead, each entity
// has a pointer to the next entity. Each entity, also referred to as a node, is composed of data and a
// reference (in other words, a link) to the next node in the sequence.
// This structure allows for efficient insertion or removal of nodes from any position in the sequence
// during iteration. More complex implementations of linked lists add additional links, allowing
// efficient insertion or removal from arbitrary node references. A drawback of linked lists is that
// access time is linear. Faster access, such as random access, is not possible.
// The main operations on linked lists are:
// • prepend - add a node to the beginning of the list
// • append - add a node to the end of the list
// • delete - remove a node from the list
// • deleteTail - remove the last node from the list
// • deleteHead - remove the first node from the list
// • find - find a node in the list

import BaseDataStructure from "./BaseDataStructure";

class LinkedListNode<T> {
  constructor(public value: T, public next: LinkedListNode<T> | null = null) {}
  toString(callback?: (v: T) => string) {
    return callback?.(this.value) || `${this.value}`;
  }
}
export class LinkedList<T> implements BaseDataStructure {
  constructor(
    public head: LinkedListNode<T> | null = null,
    public tail: LinkedListNode<T> | null = null,
    public size: number = 0
  ) {}
  prepend(value: T) {
    const newNode = new LinkedListNode<T>(value, this.head);
    this.head = newNode;
    if (!this.tail) {
      this.tail = newNode;
    }
    this.size++;
    return this;
  }
  append(value: T) {
    const newNode = new LinkedListNode<T>(value);
    // If there is no head yet let's make new node a head.
    if (!this.tail) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      const currentTail = this.tail;
      currentTail.next = newNode;
      this.tail = newNode;
    }
    this.size++;
    return this;
  }
  insert(value: T, index: number) {
    if (index >= 0 && index < this.size) {
      const node = new LinkedListNode<T>(value);
      if (index === 0) {
        const current = this.head;
        node.next = current;
        this.head = node;
      } else {
        const previous = this.getValueAt(index - 1);
        if (previous) {
          const current = previous.next;
          node.next = current;
          previous.next = node;
        }
      }
      this.size++;
      return true;
    }
    return false;
  }
  getValueAt(index: number) {
    if (index >= 0 && index < this.size) {
      let node = this.head;
      for (let i = 0; i < index && node; i++) {
        node = node.next;
      }
      return node;
    }
    return null;
  }
  indexOf(value: T) {
    let current = this.head;
    let i = 0;
    while (current?.next) {
      if (value === current.value) {
        return i;
      }
      current = current.next;
      i++;
    }
    return -1;
  }
  remove(value: T) {
    const index = this.indexOf(value);
    return this.removeAt(index);
  }
  removeAt(index: number) {
    if (index >= 0 && index < this.size && this.head) {
      let current = this.head;
      if (index === 0) {
        this.head = current.next;
      } else {
        const previous = this.getValueAt(index - 1);
        if (previous) {
          current = previous.next!;
          previous.next = current.next;
        }
      }
      this.size--;
      return current.value;
    }
    return null;
  }
  isEmpty() {
    return this.size === 0;
  }

  toString() {
    if (this.head) {
      let objString = `${this.head.value}`;
      let current = this.head.next;
      for (let i = 1; i < this.size && current; i++) {
        objString = `${objString},${current.value}`;
        current = current.next;
      }
      return objString;
    } else return "";
  }
}
