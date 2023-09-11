class Bag {
  #items = [];

  add(item) {
    this.#items.push(item);
  }

  isEmpty() {
    return this.#items.length === 0;
  }

  size() {
    return this.#items.length;
  }

  display() {
    console.log(this.#items);
  }

  [Symbol.iterator]() {
    let index = 0;
    const data = this.#items;

    return {
      next() {
        return index < data.length ? {
          done: false, value: data[index++],
        } : { done: true };
      },
    };
  }
}

const solution = (numbers) => {
  const bag = new Bag();
  numbers.forEach((num) => {
    bag.add(num);
  });

  let sum = 0;
  for (const num of bag) {
    sum += num;
  }
  // console.log('display', bag.display());

  return Math.floor(sum / bag.size());
};
// const scoresData = [1, 3, 5, 7, 9, 11];
// console.log(solution(scoresData));

test('숫자 배열의 평균을 반환한다', () => {
  expect(solution([1, 2, 3, 4, 5])).toEqual(3);
  expect(solution([1, 3, 5, 7, 9, 11])).toEqual(6);
  expect(solution([2, 4, 6, 8, 10, 12, 13, 14, 15])).toEqual(9);
});
