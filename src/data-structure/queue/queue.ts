import LinkedList, { nodeValue } from '../linked-list';

export default class Queue {
  private list: LinkedList;

  public constructor(...initialValue: nodeValue[]) {
    // use LinkedList to implement Queue
    this.list = LinkedList.fromArray(initialValue);
  }

  /** 进队 */
  public enqueue(value: nodeValue) {
    this.list.append(value);
  }

  /** 出队 */
  public dequeue(): nodeValue {
    const head = this.list.removeHead();
    return head ? head.value : null;
  }

  public isEmpty(): boolean {
    return !this.list.head;
  }
}
