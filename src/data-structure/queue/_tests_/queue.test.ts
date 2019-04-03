import Queue from '../queue';
import LinkedList from '../../linked-list';

describe.only('queue', () => {
  it('initialize a queue', () => {
    const queue = new Queue(1, 2, 3, 4);
    // @ts-ignore: for test
    const list = queue.list;

    expect(list).toEqual(LinkedList.fromArray([1, 2, 3, 4]));
  });

  it('a queue is empty', () => {
    expect(new Queue(1, 2, 3, 4).isEmpty()).toBe(false);
    expect(new Queue().isEmpty()).toBe(true);
  });

  it('enqueue values', () => {
    const queue = new Queue();
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    // @ts-ignore: for test
    const list = queue.list;

    expect(LinkedList.toArray(list)).toEqual([3, 2, 1]);
    expect(queue.isEmpty()).toBe(false);
  });

  it('dequeue values', () => {
    const queue = new Queue(1, 2, 3);
    queue.dequeue();
    queue.dequeue();
    // @ts-ignore: for test
    const list = queue.list;

    expect(LinkedList.toArray(list)).toEqual([3]);

    queue.dequeue();
    expect(queue.isEmpty()).toBe(true);
  });
});
