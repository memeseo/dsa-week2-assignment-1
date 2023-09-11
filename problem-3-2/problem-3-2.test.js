const Queue = require("../problem-3-1/problem-3-1.test");

const solution = (N, M) => {
  const queue = new Queue();

  for (let i = 1; i <= N; i++) {
    queue.enqueue(i);
  }

  let index = 0;
  while (queue.size() > 1) {
    if (index === M - 1) {
      queue.dequeue();
      index = 0;
    }
    queue.enqueue(queue.dequeue());
    index++;
  }

  return queue.dequeue();
};

test("N명의 사람이 있을 때 M번째 사람을 없앨 때 마지막에 죽는 사람의 순서를 반환한다", () => {
  expect(solution(7, 3)).toEqual(4);
  expect(solution(7, 2)).toEqual(7);
  expect(solution(10, 3)).toEqual(4);
});
