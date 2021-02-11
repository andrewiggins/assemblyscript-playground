function loadWASM(url) {
  return WebAssembly.compileStreaming(fetch(url)).then((module) =>
    WebAssembly.instantiate(module, {})
  );
}

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

const names = ["TypeScript", "AssemblyScript"];
Promise.all([
  import("../dist/index.js"),
  loadWASM("../dist/index.wasm").then((instance) => instance.exports),
]).then((modules) => modules.forEach((m, i) => runFib(m.fib, names[i])));
