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

const solution = (N, M) => {
  const queue = new Queue();
};

test('N명의 사람이 있을 때 M번째 사람을 없앨 때 마지막에 죽는 사람의 순서를 반환한다', () => {
  expect(solution(7, 3)).toEqual(4);
  expect(solution(7, 2)).toEqual(7);
  expect(solution(10, 3)).toEqual(4);
});
