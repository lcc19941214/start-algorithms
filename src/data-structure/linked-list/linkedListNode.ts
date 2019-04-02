export type nodeValue = string | number;

export default class LinkedListNode {
  public value: nodeValue;
  public next: LinkedListNode;

  public constructor(value: nodeValue, next: LinkedListNode = null) {
    this.value = value;
    this.next = next;
  }
}
