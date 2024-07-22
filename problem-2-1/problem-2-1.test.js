// 1. 스택의 정의에 따라서 API를 설계해 주세요.

// | 함수 시그니처 | 설명 |
// | ----------- | ----------- | ----------- | ----------- |
// | Stack(): 스택을 생성합니다. |
// | isEmpty(): boolean | stack 배열의 빈값 여부에 따라 boolean 타입을 반환합니다. |
// | push(item): void | stack 배열에 아이템을 추가합니다. |
// | size(): number | stack 배열의 길이를 반환합니다. |
// | pop(): string | Error | stack 배열에 가장 최근에 삽입한 값을 반환합니다. |
class Node {
  #item;
  #next;
}

class Stack {
  #first;
  #n;

  constructor(){
    this.#n = 0;
  }

  isEmpty(){
    return this.#first === undefined;
  }


  //resize를 왜 private함수로 했는지 궁금합니다
  push(item){
    const oldFirst = this.#first;

    this.#first = new Node();
    this.#first.item = item;
    this.#first.next = oldFirst;

    this.#n++;
  }

  size(){
    return this.#n;
  }

  pop(){
    if(this.#first === undefined) throw new Error('스택이 비어있습니다');

    const item = this.#first.item;
    this.#n--;

    this.#first = this.#first.next;

    return item;
  }

  [Symbol.iterator](){
    let current = this.#first;

    return {
      next(){
        if(current === undefined) return {done : true};
        const value = current.item;
        current = current.next;

        return { done : false, value}
      }
    }

  }
}

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
