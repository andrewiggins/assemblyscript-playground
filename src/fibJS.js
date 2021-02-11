/** Calculates the n-th Fibonacci number. */
export function fib(n) {
  let a = 0,
    b = 1;
  if (n > 0) {
    while (--n) {
      let t = a + b;
      a = b;
      b = t;
    }
    return b;
  }
  return a;
}
