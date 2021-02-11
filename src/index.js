import { fib as fibJS } from "./fibJS.js";
import { fib as fibTS } from "./fibTS.js";
import { instancePromise } from "asc:./fibAS.as";

function runFib(fib, name) {
  let header = document.createElement("h2");
  header.textContent = name;

  let output = document.createElement("div");
  for (let i = 0; i <= 10; ++i) {
    var div = document.createElement("div");
    div.textContent = `fib(${i}) = ${fib(i)}`;

    output.appendChild(div);
  }

  document.body.appendChild(header);
  document.body.appendChild(output);
}

runFib(fibJS, "JavaScript");
runFib(fibTS, "TypeScript");

instancePromise.then((instance) =>
  runFib(instance.exports.fib, "AssemblyScript")
);
