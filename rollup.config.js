import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { asc } from "rollup-plugin-assemblyscript";
import { terser } from "rollup-plugin-terser";

process.env.PWD = process.cwd();

/** @type {import('rollup').RollupOptions} */
const config = {
  input: "src/index.js",
  output: {
    dir: "dist",
  },
  plugins: [
    nodeResolve(),
    typescript({
      include: "./src/ts/**/*.ts",
      tsconfig: "./src/ts/tsconfig.json",
    }),
    asc({
      include: "./src/as/**/*.ts",
    }),
    // terser(),
  ],
};

export default config;
