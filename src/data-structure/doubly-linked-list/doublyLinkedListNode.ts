export default class DoublyLinkedListNode<T> {
  public value: T;
  public previous: DoublyLinkedListNode<T>;
  public next: DoublyLinkedListNode<T>;

  public constructor(
    value: T,
    next: DoublyLinkedListNode<T> = null,
    previous: DoublyLinkedListNode<T> = null
  ) {
    this.value = value;
    this.next = next;
    this.previous = previous;
  }
}
