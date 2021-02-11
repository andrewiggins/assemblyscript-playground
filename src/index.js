import { instancePromise } from "asc:./as/fibAS.ts";

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

const names = ["JavaScript", "TypeScript", "AssemblyScript"];
Promise.all([
  import("./js/fibJS.js"),
  import("./ts/fibTS.js"),
  instancePromise.then((instance) => instance.exports),
]).then((modules) => modules.forEach((m, i) => runFib(m.fib, names[i])));
