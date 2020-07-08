import * as React from "react";

import { BinarySearchTree } from "../structures/Tree";

const d = new BinarySearchTree();
console.log(d);
d.insert(7)
d.insert(6)
d.insert(5)
d.insert(8)
d.insert(10)
d.insert(9)
console.log(d.inOrderTraverse((key:any) => console.log(key)));
console.log(d.preOrderTraverse((key:any) => console.log(key)));
console.log(d.postOrderTraverse((key:any) => console.log(key)));

export interface HelloProps {}

export const Hello = (props: HelloProps) => <h1>Hello TDS!</h1>;
