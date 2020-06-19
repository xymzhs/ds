import * as React from "react";
import {LinkedList} from "../structures/LinkedList"
import {DoublyLinkedList} from "../structures/DoublyLinkedList"
const l = new LinkedList<number>()
const l2 = new DoublyLinkedList<number>()

console.log(l2.insert(5,0));

console.log(l2);
console.log(l2.getElementAt(1));
console.log(l2.getElementAt(0));






export interface HelloProps { }

export const Hello = (props: HelloProps) => <h1>Hello TDS!</h1>;