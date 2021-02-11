import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import ascFork from "./build/rollup-plugin-assemblyscript-fork";
import { terser } from "rollup-plugin-terser";

/** @type {import('rollup').RollupOptions} */
const config = {
  input: "src/index.ts",
  output: {
    dir: "dist",
    assetFileNames: "[name][extname]",
  },
  plugins: [
    nodeResolve(),
    typescript({
      tsconfig: "./src/tsconfig.json",
    }),
    ascFork(),
    // terser(),
  ],
};

export default config;
