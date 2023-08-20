// D, S, A, (-), X, A, M, (-), (-), P, L, E
class Queue {
  #capacity;

  #items;

  #n;

  constructor(capacity) {
    this.#capacity = capacity;
    this.#items = new Array(capacity);
    this.#n = 0;
  }

  enqueue(item) {
    if (this.isFull()) {
      throw new Error('용량을 초과 했습니다. ');
    }
    this.#items[this.#n] = item;
    this.#n = this.#n + 1;
  }

  dequeue() {
    if (this.isEmpty()) {
      throw new Error('큐가 비어있습니다.');
    }
    const item = this.#items[0];
    for (let i = 1; i < this.#n; i++) {
      // 값 앞으로 하나씩 당기기
      this.#items[i - 1] = this.#items[i];
    }
    this.#n = this.#n - 1;
    return item;
  }

  size() {
    return this.#n;
  }

  isEmpty() {
    return this.#n === 0;
  }

  isFull() {
    return this.#n >= this.#capacity;
  }

  display() {
    console.log(this.#items);
  }

  // 인덱스를 거꾸로 해서 스택이 가장 아래서부터 위로 순회 하도록
  [Symbol.iterator]() {
    let index = 0;
    const data = this.#items;
    const length = this.#n;

    return {
      next() {
        return index < length ? {
          done: false, value: data[index++],
        } : { done: true };
      },
    };
  }
}
// const queue = new Queue();
// queue.enqueue('D');
// queue.enqueue('S');
// queue.enqueue('A');
// queue.dequeue();
// queue.enqueue('X');
// queue.enqueue('A');
// queue.enqueue('M');
// queue.dequeue();
// queue.dequeue();
// queue.enqueue('P');
// queue.enqueue('L');
// queue.enqueue('E');

test('큐를 생성하면 비어있다', () => {
  const queue = new Queue();

  expect(queue.isEmpty()).toEqual(true);
});

test('큐에 값을 추가하면 개수가 증가한다', () => {
  const queue = new Queue();

  const oldSize = queue.size();

  queue.enqueue('D');

  const newSize = queue.size();

  expect(newSize - oldSize).toEqual(1);
});

test('큐에서 요소를 제거하면 개수가 감소한다', () => {
  const queue = new Queue();

  queue.enqueue('D');

  const oldSize = queue.size();

  queue.dequeue();

  const newSize = queue.size();

  expect(newSize - oldSize).toEqual(-1);
});

test('가장 나중에 삽입한게 먼저 나온다', () => {
  const queue = new Queue();

  queue.enqueue('D');
  queue.enqueue('S');
  queue.enqueue('A');

  expect(queue.dequeue()).toBe('D');
  expect(queue.dequeue()).toBe('S');
  expect(queue.dequeue()).toBe('A');
});

test('큐이 비어있는데 dequeue을 하면 예외를 던진다', () => {
  const queue = new Queue();

  queue.enqueue('D');
  queue.enqueue('S');
  queue.enqueue('A');

  queue.dequeue();
  queue.dequeue();
  queue.dequeue();

  expect(() => {
    queue.dequeue();
  }).toThrowError('큐가 비어있습니다');
});

test('큐는 넣은 순서대로 순회한다', () => {
  const data = ['D', 'S', 'A', 'E', 'X', 'A', 'M', 'P', 'L', 'E'];

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
