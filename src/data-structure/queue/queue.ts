import LinkedList, { nodeValue } from '../linked-list';

export default class Queue {
  private list: LinkedList;

  public constructor(...initialValue: nodeValue[]) {
    // use LinkedList to implement Queue
    this.list = LinkedList.fromArray(initialValue);
  }

  /** 向队列尾部插入一个元素 */
  public enqueue(value: nodeValue) {
    this.list.append(value);
  }

  /** 从队列头部取出一个元素 */
  public dequeue(): nodeValue {
    const head = this.list.removeHead();
    return head ? head.value : null;
  }

  public isEmpty(): boolean {
    return !this.list.head;
  }

  public toArray(): nodeValue[] {
    return LinkedList.toArray(this.list);
  }
}
