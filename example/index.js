import { LinkedList } from "../src";

let a = new LinkedList();
const b = new LinkedList();
a.append(6);
a = a.prepend(1);
a = a.prepend(2);
a.append(5);
console.log(a.getValueAt);
console.log(a.toString());
console.log(b);
