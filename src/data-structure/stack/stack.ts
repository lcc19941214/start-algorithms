import LinkedList, { nodeValue } from '../linked-list';

export default class Stack {
  private list: LinkedList;

  public constructor(...initialValues: nodeValue[]) {
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
  public push(value: nodeValue) {
    this.list.append(value);
  }

  public toArray(): nodeValue[] {
    return LinkedList.toArray(this.list);
  }
}
