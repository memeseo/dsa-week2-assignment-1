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
    console.log(this.items);
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
const solution = (braces) => {
  const stack = new Stack();
  const mapping = { ')': '(', '}': '{', ']': '[' };

  const newArr = braces.split('');

  for (const item of newArr) {
    if (item === '(' || item === '[' || item === '{') {
      stack.push(item);
    } else {
      for (const prev of stack) {
        if (prev !== mapping[item]) {
          return false;
        }
      }
    }
  }

  return true;
};

const braces = '{([])}';
console.log(solution(braces));

test('문자열에 포함된 괄호의 짝이 맞을 때 true를 반환한다', () => {
  expect(solution('{([])}')).toBe(true);
});

test('문자열에 포함된 괄호의 짝이 맞지 않을 때 false를 반환한다', () => {
  expect(solution(')[](')).toBe(false);
});

test('문자에 여는 괄호만 있고 닫는 괄호는 없을 때 false를 반환한다', () => {
  expect(solution(')[{}()[]]')).toBe(false);
});

test('여는 괄호가 앞에 나오지 않았는데 닫는 괄호가 나오는 경우에는 false를 반환한다', () => {
  expect(solution('([{}[]]{)})')).toBe(false);
});
