process.env.NODE_ENV = "development";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import filesize from "rollup-plugin-filesize";
import packageJson from "./package.json";

export default {
  input: "src/index.ts",
  output: [
    {
      file: packageJson.module, // package.json 中 "module": "dist/index.esm.js"
      format: "esm", // es module 形式的包， 用来import 导入， 可以tree shaking
      sourcemap: true,
    },
    {
      file: "dist/index.cjs.js", // package.json 中 "main": "dist/index.cjs.js",
      format: "cjs", // commonjs 形式的包， require 导入
      sourcemap: true,
    },
    {
      file: "dist/index.umd.js",
      name: "GLWidget",
      format: "umd", // umd 兼容形式的包， 可以直接应用于网页 script
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    filesize(),
    resolve(),
    commonjs(),
    typescript({ tsconfig: "tsconfig.json" }),
  ],
};
