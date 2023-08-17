/*
1. 백의 정의에 따라서 API를 설계해 주세요.
| 함수 시그니처 | 설명 |
| ----------- | ----------- |
| isEmpty(): boolean | 입력은 받지 않고 자료구조 내부에 요소가 있는지 여부를 불리언 값으로 반환합니다. |
| add(string|number): void | 문자열 혹은 숫자를 입력으로 받아 자료구조에 추가합니다. |
| size(): number | 입력은 받지 않고 자료구조 내부의 요소 갯수를 반환합니다. |

2. 다음 값들을 백에 추가했을 때 어떻게 되는지 그림으로 그려보세요.
|    D     M     S       |
|     E      P      E    |
|  X    A    L       A   |
==========================

3. 클라이언트 코드가 올바르게 동작하도록 백 자료구조를 만들어 주세요.
*/

class Bag {
  #items = [];

  isEmpty() {
    return this.#items.length === 0;
  }
  add(item) {
    this.#items.push(item);
  }
  size() {
    return this.#items.length;
  }

  [Symbol.iterator]() {
    let index = 0;
    let data = this.#items;

    return {
      next() {
        return index < data.length
          ? { done: false, value: data[index++] }
          : { done: true };
      },
    };
  }
}

test("백은 비어있는 상태로 생성된다", () => {
  const bag = new Bag();

  expect(bag.isEmpty()).toBe(true);
});

test("백에 값을 추가하면, 개수가 증가한다", () => {
  const bag = new Bag();

  const oldSize = bag.size();

  bag.add("D");

  const newSize = bag.size();

  expect(newSize - oldSize).toBe(1);
});

test("백의 모든 요소를 순회할 수 있다", () => {
  const bag = new Bag();

  [1, 3, 5, 7, 9].forEach((i) => {
    bag.add(i);
  });

  let sum = 0;

  for (const item of bag) {
    sum += item;
  }

  expect(sum).toBe(25);
});
