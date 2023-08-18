/*
1. 큐의 정의에 따라서 API를 설계해 주세요.

| 함수 시그니처 | 설명 |
| ----------- | ----------- |
| isEmpty(): boolean | 입력은 받지 않고 자료구조 내부에 요소가 있는지 여부를 불리언 값으로 반환합니다. |
| isFull(): boolean | 입력은 받지 않고 자료구조 내부에 요소가 꽉 차있는지 여부를 불리언 값으로 반환합니다. |
| enqueue(item): void | item 타입의 데이터를 입력으로 받아 자료구조 맨 뒤 요소로 추가합니다. |
| dequeue(): item | 맨 앞의 요소를 자료구조에서 제거합니다. |
| size(): number | 입력은 받지 않고 자료구조 내부의 요소 갯수를 반환합니다. |

2. 다음 값들을 큐에 추가했을 때 어떻게 되는지 그림으로 그려보세요. `(-)`은 값을 꺼내는 것을 의미합니다.

D, S, A, (-), X, A, M, (-), (-), P, L, E

==========================
-->  E  L  P  M  A  X  -->
==========================

*/

class Queue {
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
  enqueue(item) {
    if (this.isFull()) {
      throw new Error("용량을 초과했습니다.");
    }

    this.#items[this.#n] = item;
    this.#n = this.#n + 1;
  }

  dequeue() {
    if (this.isEmpty()) {
      throw new Error("큐가 비어있습니다");
    }

    const item = this.#items[0];

    for (let i = 1; i < this.#n; i++) {
      this.#items[i - 1] = this.#items[i];
    }

    this.#n = this.#n - 1;
    return item;
  }

  [Symbol.iterator]() {
    let index = 0;
    let data = this.#items;
    const length = this.#n;

    return {
      next() {
        return index < length
          ? { done: false, value: data[index++] }
          : { done: true };
      },
    };
  }
}

module.exports = Queue;

test("큐를 생성하면 비어있다", () => {
  const queue = new Queue();

  expect(queue.isEmpty()).toEqual(true);
});

test("큐에 값을 추가하면 개수가 증가한다", () => {
  const queue = new Queue();

  const oldSize = queue.size();

  queue.enqueue("D");

  const newSize = queue.size();

  expect(newSize - oldSize).toEqual(1);
});

test("큐에서 요소를 제거하면 개수가 감소한다", () => {
  const queue = new Queue();

  queue.enqueue("D");

  const oldSize = queue.size();

  queue.dequeue();

  const newSize = queue.size();

  expect(newSize - oldSize).toEqual(-1);
});

test("가장 나중에 삽입한게 먼저 나온다", () => {
  const queue = new Queue();

  queue.enqueue("D");
  queue.enqueue("S");
  queue.enqueue("A");

  expect(queue.dequeue()).toBe("D");
  expect(queue.dequeue()).toBe("S");
  expect(queue.dequeue()).toBe("A");
});

test("큐이 비어있는데 dequeue을 하면 예외를 던진다", () => {
  const queue = new Queue();

  queue.enqueue("D");
  queue.enqueue("S");
  queue.enqueue("A");

  queue.dequeue();
  queue.dequeue();
  queue.dequeue();

  expect(() => {
    queue.dequeue();
  }).toThrowError("큐가 비어있습니다");
});

test("큐는 넣은 순서대로 순회한다", () => {
  const data = ["D", "S", "A", "E", "X", "A", "M", "P", "L", "E"];

  const queue = new Queue();

  data.forEach((i) => {
    queue.enqueue(i);
  });

  const output = [];

  for (const item of queue) {
    output.push(item);
  }

  expect(output).toEqual(data);
});
