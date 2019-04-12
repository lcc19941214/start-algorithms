import LinkedList from '../linkedList';
import LinkedListNode from '../linkedListNode';

const initList = <T>(...values: T[]) => {
  const list = new LinkedList<T>();
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
    expect(new LinkedList().contains(1)).toBe(false);
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

  it('traverse with no walker', () => {
    expect(() => initList(1, 2, 3, 4).traverse()).not.toThrowError();
  });

  it('reverse a list', () => {
    expect(new LinkedList().reverse()).toEqual(new LinkedList());
    expect(initList(1, 2, 3, 4).reverse()).toEqual(initList(4, 3, 2, 1));
  });

  it('convert from array', () => {
    expect(LinkedList.fromArray([1, 2, 3, 4])).toEqual(initList(1, 2, 3, 4));
  });

  it('convert to array', () => {
    const list = initList(1, 2, 3, 4);
    expect(LinkedList.toArray(list)).toEqual([1, 2, 3, 4]);
  });

  it('remove elements', () => {
    expect(initList().remove(1)).toBe(false);

    const list = initList(1, 2, 3, 4, 1, 2, 3, 1);
    const result = list.remove(1);

    expect(result).toBe(true);
    expect(list).toEqual(initList(2, 3, 4, 2, 3));
  });

  it('clear list with all the same elements', () => {
    const list = initList(1, 1, 1, 1, 1, 1);
    const result = list.remove(1);
    expect(result).toBe(true);
    expect(list).toEqual(initList());
  });

  it('should find one element', () => {
    const list = initList(1, 2, 3, 4);
    expect(initList().find(node => node.value === 1)).toBeNull();
    expect(list.find(node => node.value === 4)).toEqual(list.tail);
    expect(list.find(node => node.value === 5)).toBeNull();
  });
});
