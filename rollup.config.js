import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { asc } from "rollup-plugin-assemblyscript";

process.env.PWD = process.cwd();

/** @type {import('rollup').RollupOptions} */
const config = {
  input: "src/index.js",
  output: {
    dir: "dist",
  },
  plugins: [
    nodeResolve(),
    typescript(),
    asc({
      fileExtension: ".as",
    }),
  ],
};

export default config;
