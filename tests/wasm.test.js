import path from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";
import loader from "@assemblyscript/loader";
import { runFibTest } from "./fib.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const wasmPath = path.join(__dirname, "../dist/index.wasm");
const wasmModule = loader.instantiateSync(readFileSync(wasmPath));
runFibTest(wasmModule.exports.fib);
