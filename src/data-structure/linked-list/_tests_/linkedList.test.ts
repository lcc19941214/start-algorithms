import LinkedList from '../linkedList';
import LinkedListNode, { nodeValue } from '../linkedListNode';

const initList = (...values: nodeValue[]) => {
  const list = new LinkedList();
  values.forEach(value => {
    list.append(value);
  });
  return list;
};

describe('linked list', () => {
  it('init a linked list', () => {
    const list = new LinkedList();
    expect(list.head).toBe(null);
    expect(list.tail).toBe(null);
  });

  it('prepend a value', () => {
    const list = new LinkedList();
    const value = 'head';
    list.prepend(value);
    expect(list.head).toBeInstanceOf(LinkedListNode);
    expect(list.head.value).toBe(value);
  });

  it('append some nodes', () => {
    const list = initList(1, 2, 3);
    expect(list.tail).toBeInstanceOf(LinkedListNode);
    expect(list.tail.value).toBe(3);
    expect(list.head.next.next.value).toBe(3);
  });

  it('contains a value', () => {
    const list = initList(1, 2, 3);
    expect(list.contains(3)).toBe(true);
    expect(list.contains(4)).toBe(false);
  });

  it('remove head of multiple nodes', () => {
    const list = initList(1, 2, 3, 4);
    const head = list.removeHead();
    expect(head.value).toBe(1);
    expect(list).toEqual(initList(2, 3, 4));
  });

  it('remove head of empty list', () => {
    const list = new LinkedList();
    expect(list.removeHead()).toBe(null);
  });

  it('remove head of one node list', () => {
    const list = initList(1);
    list.removeHead();
    expect(list.head).toBe(null);
    expect(list.tail).toBe(null);
  });

  it('remove tail', () => {
    const list = initList(1, 2, 3, 4);
    const tail = list.removeTail();
    expect(tail.value).toBe(4);
    expect(list).toEqual(initList(1, 2, 3));
  });

  it('remove tail of empty list', () => {
    const list = new LinkedList();
    expect(list.removeTail()).toBe(null);
  });

  it('remove tail of one node list', () => {
    const list = initList(1);
    list.removeTail();
    expect(list.head).toBe(null);
    expect(list.tail).toBe(null);
  });

  it('reverse a list', () => {
    expect(initList(1, 2, 3, 4).reverse()).toEqual(initList(4, 3, 2, 1));
  });

  it('convert from array', () => {
    expect(LinkedList.fromArray([1, 2, 3, 4])).toEqual(initList(1, 2, 3, 4));
  });

  it('convert to array', () => {
    const list = initList(1, 2, 3, 4);
    expect(LinkedList.toArray(list)).toEqual([1, 2, 3, 4]);
  });
});
