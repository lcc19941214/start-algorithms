export type nodeValue = string | number;

export default class LinkedListNode<T> {
  public value: T;
  public next: LinkedListNode<T>;

  public constructor(value: T, next: LinkedListNode<T> = null) {
    this.value = value;
    this.next = next;
  }
}
