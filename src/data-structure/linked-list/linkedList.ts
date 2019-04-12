import LinkedListNode from './linkedListNode';

export default class LinkedList<T = any> {
  public head!: LinkedListNode<T>;
  public tail!: LinkedListNode<T>;

  public constructor() {
    this.head = null;
    this.tail = null;
  }

  /** 在头部插入 */
  public prepend(value: T) {
    const node = new LinkedListNode(value, this.head);
    this.head = node;
    if (this.tail === null) {
      this.tail = node;
    }
  }

  /** 在尾部插入 */
  public append(value: T) {
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
  public contains(value: T): boolean {
    if (!this.head) return false;
    let cur = this.head;
    while (cur && cur.value !== value) {
      cur = cur.next;
    }
    return cur !== null;
  }

  /** 查询链表中是否有满足某个条件的节点 */
  public find(query: (node: LinkedListNode<T>) => boolean): LinkedListNode<T> {
    if (!this.head) return null;
    let cur = this.head;
    while (cur) {
      if (query(cur)) {
        return cur;
      }
      cur = cur.next;
    }
    return null;
  }

  /** 遍历整个链表 */
  public traverse(walker: (node: LinkedListNode<T>) => void = () => {}) {
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
  public remove(value: T): boolean {
    if (!this.head) return false;

    let deletedNode: LinkedListNode<T> = null;
    let cur = this.head;
    let prev: LinkedListNode<T> = null;
    let next: LinkedListNode<T> = null;
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
  public removeHead(): LinkedListNode<T> {
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
  public removeTail(): LinkedListNode<T> {
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
  public reverse(): LinkedList<T> {
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

  public static fromArray = <K>(arr: K[]): LinkedList<K> => {
    const list = new LinkedList<K>();
    arr.forEach(value => {
      list.append(value);
    });
    return list;
  };

  public static toArray = <K>(list: LinkedList<K>): K[] => {
    const array: K[] = [];
    list.traverse(node => {
      array.push(node.value);
    });
    return array;
  };
}
