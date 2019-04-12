import LinkedList from '../linked-list';

export default class Queue<T> {
  private list: LinkedList<T>;

  public constructor(...initialValue: T[]) {
    // use LinkedList to implement Queue
    this.list = LinkedList.fromArray(initialValue);
  }

  /** 向队列尾部插入一个元素 */
  public enqueue(value: T) {
    this.list.append(value);
  }

  /** 从队列头部取出一个元素 */
  public dequeue(): T {
    const head = this.list.removeHead();
    return head ? head.value : null;
  }

  public isEmpty(): boolean {
    return !this.list.head;
  }

  public toArray(): T[] {
    return LinkedList.toArray(this.list);
  }
}
