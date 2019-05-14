import Stack from '../stack';
import LinkedList from '../../linked-list';

describe('stack', () => {
  it('should create a empty stack', () => {
    const stack = new Stack();
    expect(stack.isEmpty()).toBe(true);
  });

  it('should peek a head element', () => {
    const stack = new Stack(1, 2, 3);
    expect(stack.peek()).toBe(1);
    expect(new Stack().peek()).toBeNull();
  });

  it('should push values into the end', () => {
    const stack = new Stack();
    stack.push(1);
    stack.push(2);
    stack.push(3);
    // @ts-ignore: for test
    const list = stack.list;

    expect(LinkedList.toArray(list)).toEqual([1, 2, 3]);
    expect(stack.isEmpty()).toBe(false);
  });

  it('should pop values from the end', () => {
    const stack = new Stack(1, 2, 3);
    stack.pop();
    stack.pop();
    // @ts-ignore: for test
    const list = stack.list;

    expect(LinkedList.toArray(list)).toEqual([1]);

    stack.pop();
    expect(stack.isEmpty()).toBe(true);

    expect(new Stack().pop()).toBeNull();
  });

  it('should push and pop values in LIFO order', () => {
    const stack = new Stack();
    stack.push(1);
    stack.push(2);
    expect(stack.pop()).toBe(2);
    expect(stack.pop()).toBe(1);
  });

  it('should be possible to convert a stack to array', () => {
    const stack = new Stack();
    stack.push(1);
    stack.push(2);
    stack.push(3);
    stack.pop();
    stack.push(4);
    expect(stack.toArray()).toEqual([1, 2, 4]);
  });
});
