import DoublyLinkedListNode, { nodeValue } from './doublyLinkedListNode';

export default class DoublyLinkedList {
  public head!: DoublyLinkedListNode;
  public tail!: DoublyLinkedListNode;

  public constructor() {
    this.head = null;
    this.tail = null;
  }

  /** 在头部插入 */
  public prepend(value: nodeValue) {
    const node = new DoublyLinkedListNode(value, this.head, null);
    if (this.head) {
      this.head.previous = node;
    }
    this.head = node;
    if (this.tail === null) {
      this.tail = node;
    }
  }

  /** 在尾部插入 */
  public append(value: nodeValue) {
    const node = new DoublyLinkedListNode(value, null, this.tail);
    if (this.head === null) {
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

  /** 正向遍历整个链表 */
  public traverse(walker: (node: DoublyLinkedListNode) => void = () => {}) {
    let cur = this.head;
    while (cur) {
      walker(cur);
      cur = cur.next;
    }
  }

  /** 反向遍历整个链表 */
  public traverseRight(walker: (node: DoublyLinkedListNode) => void = () => {}) {
    let cur = this.tail;
    while (cur) {
      walker(cur);
      cur = cur.previous;
    }
  }

  /**
   * 移除某一项，如果有相同的 value，则全部都删除.
   * 返回是否删除成功.
   */
  public remove(value: nodeValue): boolean {
    if (!this.head) return false;

    let deletedNode: DoublyLinkedListNode = null;
    let cur = this.head;
    while (cur) {
      const prev = cur.previous;
      const next = cur.next;
      if (cur.value === value) {
        deletedNode = cur;

        // handle next
        if (next) {
          next.previous = prev;
        }

        // handle previous
        if (prev) {
          prev.next = next;
        } else {
          this.head = next;
        }
      }
      cur = next;
    }
    if (this.tail === deletedNode) {
      this.tail = this.tail.previous;
    }
    return deletedNode !== null;
  }

  /** 删除头部节点，返回删除的节点 */
  public removeHead(): DoublyLinkedListNode {
    if (!this.head) return null;

    let deletedHead = this.head;
    const next = deletedHead.next;
    if (next) {
      next.previous = null;
      this.head = next;
    } else {
      this.head = null;
      this.tail = null;
    }

    return deletedHead;
  }

  /** 删除尾部节点，返回删除的节点 */
  public removeTail(): DoublyLinkedListNode {
    if (!this.head) return null;

    let deletedTail = this.tail;
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      const prev = this.tail.previous;
      prev.next = null;
      this.tail = prev;
    }

    return deletedTail;
  }

  /** 反转单向链表 */
  public reverse(): DoublyLinkedList {
    if (!this.head) return this;

    let cur = this.head;
    let prev = null;
    let next = null;
    while (cur) {
      next = cur.next;
      cur.next = prev;
      cur.previous = next;
      prev = cur;
      cur = next;
    }

    this.tail = this.head;
    this.head = prev;

    return this;
  }

  public static fromArray = (arr: nodeValue[]): DoublyLinkedList => {
    const list = new DoublyLinkedList();
    arr.forEach(value => {
      list.append(value);
    });
    return list;
  };

  public static toArray = (list: DoublyLinkedList): nodeValue[] => {
    const array: nodeValue[] = [];
    list.traverse(node => {
      array.push(node.value);
    });
    return array;
  };
}
