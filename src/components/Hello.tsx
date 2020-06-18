import * as React from "react";
import {LinkedList} from "../structures/linkedList"

const l = new LinkedList<number>()

console.log(l.push(3));
console.log(l.push(4));
console.log(l.insert(5,1));
console.log(l.remove(3));

console.log(l);
console.log(l.getElementAt(1));
console.log(l.getElementAt(0));






export interface HelloProps { }

export const Hello = (props: HelloProps) => <h1>Hello TDS!</h1>;