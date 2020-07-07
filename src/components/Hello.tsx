import * as React from "react";
import { Dictionary,HashTable } from "../structures/Dictionary";
import { OBJSet } from "../structures/Set";

const d = new HashTable();
d.put("rqwqwr", "qwrqwrqwr");
d.put("rqwqwr2", "qwrqwrqwr2");
d.put(3, "qwrqwrqwr3");
console.log(d.remove(3));
console.log(d.get("rqwqwr2"));


export interface HelloProps {}

export const Hello = (props: HelloProps) => <h1>Hello TDS!</h1>;
