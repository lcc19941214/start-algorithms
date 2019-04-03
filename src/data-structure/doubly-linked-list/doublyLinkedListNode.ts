export type nodeValue = string | number;

export default class DoublyLinkedListNode {
  public value: nodeValue;
  public previous: DoublyLinkedListNode;
  public next: DoublyLinkedListNode;

  public constructor(
    value: nodeValue,
    next: DoublyLinkedListNode = null,
    previous: DoublyLinkedListNode = null
  ) {
    this.value = value;
    this.next = next;
    this.previous = previous;
  }
}
