import { test } from "uvu";
import * as assert from "uvu/assert";

const results = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55];

export function runFibTest(fib) {
  test("fib returns correct results", () => {
    for (let i = 0; i <= 10; i++) {
      assert.equal(fib(i), results[i], `fib(${i})`);
    }
  });

  test.run();
}
