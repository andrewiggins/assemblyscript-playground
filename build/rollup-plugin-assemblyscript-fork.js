// Modified version of rollup-plugin-assemblyscript
// https://github.com/surma/rollup-plugin-assemblyscript
// License under Apache License, Version 2.0
// https://github.com/surma/rollup-plugin-assemblyscript/blob/master/LICENSE

import path from "path";
import os from "os";
import asCompiler from "assemblyscript/cli/asc";
import { Transform } from "stream";
import { readFile, mkdtemp } from "fs/promises";

function streamCollector() {
  const stream = new Transform({
    transform(chunk, _enc, cb) {
      this.push(chunk);
      cb();
    },
  });
  let chunks = [];
  const result = new Promise((resolve, reject) => {
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks)));
  });
  return { stream, result };
}

/**
 * @param {string} inputPath
 * @param {string} outputPath
 * @param {ASCForkOptions} opts
 */
function runAssemblyScriptCompiler(inputPath, outputPath, opts) {
  return new Promise(async (resolve, reject) => {
    const errorCollector = streamCollector();
    const params = [
      inputPath,
      "-b",
      outputPath,
      ...Object.entries(opts.compilerOptions).map(([opt, val]) => {
        if (typeof val === "boolean") {
          return `--${opt}`;
        }
        return `--${opt}=${val}`;
      }),
    ];
    // @ts-ignore The callback function doesn't like our async function
    asCompiler.main(params, { stderr: errorCollector.stream }, async (err) => {
      if (err) {
        errorCollector.stream.end();
        const stderr = await errorCollector.result;
        const msg = new TextDecoder().decode(stderr);
        return reject(msg);
      }
      resolve();
    });
  });
}

const defaultOpts = {
  compilerOptions: {},
};

/**
 * @typedef ASCForkOptions
 * @property {import('assemblyscript/cli/asc').CompilerOptions} [compilerOptions]
 *
 * @param {ASCForkOptions} [pluginOptions]
 * @returns {import('rollup').Plugin}
 */
export default function ascFork(pluginOptions) {
  pluginOptions = { ...defaultOpts, ...pluginOptions };

  return {
    name: "assemblyscript-fork",
    async buildStart(options) {
      /** @type {Array<[string, string]>} Array of [name, path] tuples */
      let inputs = [];
      if (Array.isArray(options.input)) {
        for (let input of options.input) {
          inputs.push([path.basename(input), input]);
        }
      } else {
        for (let alias of Object.keys(options.input)) {
          inputs.push([alias, options.input[alias]]);
        }
      }

      await asCompiler.ready;

      for (let [name, inputPath] of inputs) {
        name = name.replace(/\.[^.]+$/, ""); // Remove extension
        const wasmFileName = `${name}.wasm`;
        const outputDir = await mkdtemp(
          path.join(os.tmpdir(), "rollup-plugin-assemblyscript-fork-")
        );
        const outputPath = path.join(outputDir, wasmFileName);

        await runAssemblyScriptCompiler(inputPath, outputPath, pluginOptions);

        this.emitFile({
          type: "asset",
          name: wasmFileName,
          source: await readFile(outputPath),
        });
      }
    },
  };
}
