// D, S, A, (-), X, A, M, (-), (-), P, L, E
class Stack {
  #capacity;

  #items;

  #n;

  constructor(capacity) {
    this.#capacity = capacity;
    this.#items = new Array(capacity);
    this.#n = 0;
  }

  push(item) {
    if (this.isFull()) {
      throw new Error('용량을 초과 했습니다. ');
    }
    this.#items[this.#n] = item;
    this.#n = this.#n + 1;
  }

  pop() {
    if (this.isEmpty()) {
      throw new Error('스택이 비어있습니다.');
    }
    this.#n = this.#n - 1;
    return this.#items[this.#n];
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
    let index = this.#n;
    const data = this.#items;

    return {
      next() {
        index = index - 1;
        return index >= 0 ? {
          done: false, value: data[index],
        } : { done: true };
      },
    };
  }
}
// const stack = new Stack();
// stack.push('D');
// stack.push('S');
// stack.push('A');
// stack.pop();
// stack.push('X');
// stack.push('A');
// stack.push('M');
// stack.pop();
// stack.pop();
// stack.push('P');
// stack.push('L');
// stack.push('E');

test('스택을 생성하면 비어있다', () => {
  const stack = new Stack();

  expect(stack.isEmpty()).toEqual(true);
});

test('스택에 값을 추가하면 개수가 증가한다', () => {
  const stack = new Stack();

  const oldSize = stack.size();

  stack.push('D');

  const newSize = stack.size();

  expect(newSize - oldSize).toEqual(1);
});

test('스택에서 요소를 제거하면 개수가 감소한다', () => {
  const stack = new Stack();

  stack.push('D');

  const oldSize = stack.size();

  stack.pop();

  const newSize = stack.size();

  expect(newSize - oldSize).toEqual(-1);
});

test('가장 최근에 삽입한게 먼저 나온다', () => {
  const stack = new Stack();

  stack.push('D');
  stack.push('S');
  stack.push('A');

  expect(stack.pop()).toBe('A');
  expect(stack.pop()).toBe('S');
  expect(stack.pop()).toBe('D');
});

test('스택이 비어있는데 pop을 하면 예외를 던진다', () => {
  const stack = new Stack();

  stack.push('D');
  stack.push('S');
  stack.push('A');

  stack.pop();
  stack.pop();
  stack.pop();

  expect(() => {
    stack.pop();
  }).toThrowError('스택이 비어있습니다');
});

test('스택은 역순으로 순회한다', () => {
  const data = ['D', 'S', 'A', 'E', 'X', 'A', 'M', 'P', 'L', 'E'];

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
