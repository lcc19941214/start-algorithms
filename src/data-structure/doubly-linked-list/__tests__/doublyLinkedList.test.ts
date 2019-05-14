import DoublyLinkedList from '../doublyLinkedList';
import DoublyLinkedListNode from '../doublyLinkedListNode';

const initList = <T>(...values: T[]) => {
  const list = new DoublyLinkedList<T>();
  values.forEach(value => {
    list.append(value);
  });
  return list;
};

describe('doubly linked list', () => {
  it('initialize a doubly linked node', () => {
    const node = new DoublyLinkedListNode(1);
    expect(node).toEqual({ value: 1, previous: null, next: null });
  });

  it('initialize a doubly linked list', () => {
    const list = new DoublyLinkedList();
    expect(list.head).toBe(null);
    expect(list.tail).toBe(null);
  });

  it('prepend a value', () => {
    const list = new DoublyLinkedList<number>();
    list.prepend(3);
    list.prepend(2);
    list.prepend(1);
    expect(list.head).toBeInstanceOf(DoublyLinkedListNode);
    expect(list).toEqual(initList(1, 2, 3));
  });

  it('append some nodes', () => {
    const list = initList(1, 2, 3);
    list.append(4);
    expect(list.tail).toBeInstanceOf(DoublyLinkedListNode);
    expect(list).toEqual(initList(1, 2, 3, 4));
  });

  it('contains a value', () => {
    const list = initList(1, 2, 3);
    expect(list.contains(3)).toBe(true);
    expect(list.contains(4)).toBe(false);
    expect(new DoublyLinkedList().contains(1)).toBe(false);
  });

  it('remove head of multiple nodes', () => {
    const list = initList(1, 2, 3, 4);
    const head = list.removeHead();
    expect(head.value).toBe(1);
    expect(list).toEqual(initList(2, 3, 4));
  });

  it('remove head of empty list', () => {
    const list = new DoublyLinkedList();
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
    const list = new DoublyLinkedList();
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
    expect(() => initList(1, 2, 3, 4).traverseRight()).not.toThrowError();
  });

  it('reverse a list', () => {
    expect(new DoublyLinkedList().reverse()).toEqual(new DoublyLinkedList());
    expect(initList(1, 2, 3, 4).reverse()).toEqual(initList(4, 3, 2, 1));
  });

  it('convert from array', () => {
    expect(DoublyLinkedList.fromArray([1, 2, 3, 4])).toEqual(initList(1, 2, 3, 4));
  });

  it('reverse a array use doubly linked list', () => {
    const arr = [1, 2, 3, 4];
    const list = DoublyLinkedList.fromArray(arr);
    const reversedArr = [];
    list.traverseRight(node => {
      reversedArr.push(node.value);
    });
    expect(reversedArr).toEqual([4, 3, 2, 1]);
  });

  it('convert to array', () => {
    const list = initList(1, 2, 3, 4);
    expect(DoublyLinkedList.toArray(list)).toEqual([1, 2, 3, 4]);
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
});
