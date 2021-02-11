import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { asc } from "rollup-plugin-assemblyscript";
import { terser } from "rollup-plugin-terser";

process.env.PWD = process.cwd();

/** @type {import('rollup').RollupOptions} */
const config = {
  input: "src/index.ts",
  output: {
    dir: "dist",
  },
  plugins: [
    nodeResolve(),
    typescript({
      tsconfig: "./src/as/tsconfig.json",
    }),
    asc(),
    // terser(),
  ],
};

export default config;
