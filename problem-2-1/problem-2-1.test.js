/*
1. 스택의 정의에 따라서 API를 설계해 주세요.

| 함수 시그니처 | 설명 |
| ----------- | ----------- |
| isEmpty(): boolean | 입력은 받지 않고 자료구조 내부에 요소가 있는지 여부를 불리언 값으로 반환합니다. |
| isFull(): boolean | 입력은 받지 않고 자료구조 내부에 요소가 꽉 차있는지 여부를 불리언 값으로 반환합니다. |
| push(item): void | item 타입의 데이터를 입력으로 받아 자료구조 맨 위 요소로 추가합니다. |
| pop(): void | 맨 위의 요소를 자료구조에서 제거합니다. |
| size(): number | 입력은 받지 않고 자료구조 내부의 요소 갯수를 반환합니다. |

2. 다음 값들을 스택에 추가했을 때 어떻게 되는지 그림으로 그려보세요. `(-)`은 값을 꺼내는 것을 의미합니다.
D, S, A, (-), X, A, M, (-), (-), P, L, E
|  E  |
|  L  |
|  P  |
|  X  |
|  S  |
|  D  |
=======
*/

class Stack {
  #capacity;
  #items;
  #n;

  constructor(capacity) {
    this.#capacity = capacity;
    this.#items = new Array(capacity);
    this.#n = 0;
  }

  isEmpty() {
    return this.#n === 0;
  }

  isFull() {
    return this.#n >= this.#capacity;
  }

  size() {
    return this.#n;
  }

  push(item) {
    if (this.isFull()) {
      throw new Error("용량을 초과했습니다.");
    }

    this.#items[this.#n] = item;
    this.#n = this.#n + 1;
  }

  pop() {
    if (this.isEmpty()) {
      throw new Error("스택이 비어있습니다");
    }
    this.#n = this.#n - 1;
    return this.#items[this.#n];
  }

  [Symbol.iterator]() {
    let index = this.#n;
    let data = this.#items;

    return {
      next() {
        return index >= 0
          ? { done: false, value: data[index--] }
          : { done: true };
      },
    };
  }
}

test("스택을 생성하면 비어있다", () => {
  const stack = new Stack();

  expect(stack.isEmpty()).toEqual(true);
});

test("스택에 값을 추가하면 개수가 증가한다", () => {
  const stack = new Stack();

  const oldSize = stack.size();

  stack.push("D");

  const newSize = stack.size();

  expect(newSize - oldSize).toEqual(1);
});

test("스택에서 요소를 제거하면 개수가 감소한다", () => {
  const stack = new Stack();

  stack.push("D");

  const oldSize = stack.size();

  stack.pop();

  const newSize = stack.size();

  expect(newSize - oldSize).toEqual(-1);
});

test("가장 최근에 삽입한게 먼저 나온다", () => {
  const stack = new Stack();

  stack.push("D");
  stack.push("S");
  stack.push("A");

  expect(stack.pop()).toBe("A");
  expect(stack.pop()).toBe("S");
  expect(stack.pop()).toBe("D");
});

test("스택이 비어있는데 pop을 하면 예외를 던진다", () => {
  const stack = new Stack();

  stack.push("D");
  stack.push("S");
  stack.push("A");

  stack.pop();
  stack.pop();
  stack.pop();

  expect(() => {
    stack.pop();
  }).toThrowError("스택이 비어있습니다");
});

test("스택은 역순으로 순회한다", () => {
  const data = ["D", "S", "A", "E", "X", "A", "M", "P", "L", "E"];

  const stack = new Stack();

  data.forEach((i) => {
    stack.push(i);
  });

  const output = [];

  for (const item of stack) {
    output.push(item);
  }

  expect(output.reverse()).toEqual(data);
});
