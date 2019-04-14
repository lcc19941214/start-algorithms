import LinkedList from '../linked-list';

export default class Stack<T> {
  private list: LinkedList<T>;

  public constructor(...initialValues: T[]) {
    this.list = LinkedList.fromArray(initialValues);
  }

  public isEmpty(): boolean {
    return !this.list.head;
  }

  /** 返回指向栈头部的值 */
  public peek() {
    if (this.isEmpty()) {
      return null;
    }

    return this.list.head.value;
  }

  /** 从栈尾取出一个元素 */
  public pop() {
    const tail = this.list.removeTail();
    return tail ? tail.value : null;
  }

  /** 向栈尾推入一个元素 */
  public push(value: T) {
    this.list.append(value);
  }

  public toArray(): T[] {
    return LinkedList.toArray(this.list);
  }
}
