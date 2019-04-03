import LinkedListNode, { nodeValue } from './linkedListNode';

export default class LinkedList {
  public head!: LinkedListNode;
  public tail!: LinkedListNode;

  public constructor() {
    this.head = null;
    this.tail = null;
  }

  /** 在头部插入 */
  public prepend(value: nodeValue) {
    const node = new LinkedListNode(value, this.head);
    this.head = node;
    if (this.tail === null) {
      this.tail = node;
    }
  }

  /** 在尾部插入 */
  public append(value: nodeValue) {
    const node = new LinkedListNode(value);
    if (!this.head && !this.tail) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
  }

  /** 链表中是否包含 */
  public contains(value: nodeValue): boolean {
    if (!this.head) return false;
    let cur = this.head;
    while (cur && cur.value !== value) {
      cur = cur.next;
    }
    return cur !== null;
  }

  /** 遍历整个链表 */
  public traverse(walker: (node: LinkedListNode) => void = () => {}) {
    let cur = this.head;
    while (cur) {
      walker(cur);
      cur = cur.next;
    }
  }

  /**
   * 移除某一项，如果有相同的 value，则全部都删除.
   * 返回是否删除成功. 
   */
  public remove(value: nodeValue): boolean {
    if (!this.head) return false;

    let deletedNode: LinkedListNode = null;
    let cur = this.head;
    let prev: LinkedListNode = null;
    let next: LinkedListNode = null;
    while (cur) {
      next = cur.next;
      if (cur.value === value) {
        deletedNode = cur;
        if (!prev) {
          this.head = next;
        } else {
          prev.next = next;
        }
      } else {
        prev = cur;
      }
      cur = next;
    }

    if (this.head === null) {
      this.tail = null;
    }

    if (this.tail && this.tail.value === value) {
      this.tail = prev;
    }

    return deletedNode !== null;
  }

  /** 删除头部节点，返回删除的节点 */
  public removeHead(): LinkedListNode {
    if (!this.head) return null;

    let deletedHead = this.head;

    const next = this.head.next;
    if (next) {
      this.head = next;
    } else {
      this.head = null;
      this.tail = null;
    }
    return deletedHead;
  }

  /** 删除尾部节点，返回删除的节点 */
  public removeTail(): LinkedListNode {
    if (!this.tail) return null;

    const deletedTail = this.tail;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      return deletedTail;
    }

    let cur = this.head;
    let pre = null;
    while (cur && cur.next) {
      pre = cur;
      cur = cur.next;
    }
    this.tail = pre;
    pre.next = null;
    return deletedTail;
  }

  /** 反转单向链表 */
  public reverse(): LinkedList {
    if (!this.head) return this;

    let cur = this.head;
    let prev = null;
    let next = null;

    while (cur) {
      next = cur.next;
      cur.next = prev;
      prev = cur;
      cur = next;
    }

    this.tail = this.head;
    this.head = prev;

    return this;
  }

  public static fromArray = (arr: nodeValue[]): LinkedList => {
    const list = new LinkedList();
    arr.forEach(value => {
      list.append(value);
    });
    return list;
  };

  public static toArray = (list: LinkedList): nodeValue[] => {
    const array: nodeValue[] = [];
    list.traverse(node => {
      array.push(node.value);
    });
    return array;
  };
}
