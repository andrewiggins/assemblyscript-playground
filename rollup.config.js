import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { asc } from "rollup-plugin-assemblyscript";

/** @type {import('rollup').RollupOptions} */
const config = {
  input: "src/index.js",
  output: {
    dir: "dist",
  },
  plugins: [nodeResolve(), typescript()],
};

export default config;
