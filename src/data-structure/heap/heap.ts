/**
 * Parent class for Min and Max Heaps.
 * 借助数组，使用完全二叉树的方式定义一个堆.
 */
export default class Heap<T = any> {
  public heapContainer?: T[];

  protected constructor() {
    if (new.target === Heap) {
      throw new TypeError('Cannot construct Heap instance directly');
    }

    // Array representation of the heap.
    this.heapContainer = [];
  }

  /** 获取当前节点左侧的子节点的索引 */
  public getLeftChildIndex(parentIndex: number): number {
    return parentIndex * 2 + 1;
  }

  /** 获取当前节点右侧的子节点的索引*/
  public getRightChildIndex(parentIndex: number): number {
    return parentIndex * 2 + 2;
  }

  /** 获取当前节点的父节点的索引 */
  public getParentIndex(childIndex: number): number {
    return Math.floor((childIndex - 1) / 2);
  }

  public hasParent(childIndex: number): boolean {
    const parentIndex = this.getParentIndex(childIndex);
    return parentIndex >= 0;
  }

  public hasLeftChild(parentIndex: number): boolean {
    const childIndex = this.getLeftChildIndex(parentIndex);
    return childIndex > 0 && childIndex < this.heapContainer.length;
  }

  public hasRightChild(parentIndex: number): boolean {
    const childIndex = this.getRightChildIndex(parentIndex);
    return childIndex > 0 && childIndex < this.heapContainer.length;
  }

  public leftChild(parentIndex: number): T {
    const childIndex = this.getLeftChildIndex(parentIndex);
    return this.heapContainer[childIndex];
  }

  public rightChild(parentIndex: number): T {
    const childIndex = this.getRightChildIndex(parentIndex);
    return this.heapContainer[childIndex];
  }

  public parent(childIndex: number): T {
    const parentIndex = this.getParentIndex(childIndex);
    return this.heapContainer[parentIndex];
  }

  /** 交换指定索引的两个值 */
  public swap(indexOne: number, indexTwo: number) {
    const temp = this.heapContainer[indexTwo];
    this.heapContainer[indexTwo] = this.heapContainer[indexOne];
    this.heapContainer[indexOne] = temp;
  }

  /** 获取 heap 的 root 节点 */
  public peek(): T {
    if (!this.heapContainer.length) {
      return null;
    }

    return this.heapContainer[0];
  }

  /** 取出 heap 的 root 节点 */
  public poll(): T {
    if (!this.heapContainer.length) {
      return null;
    }

    if (this.heapContainer.length === 1) {
      return this.heapContainer.pop();
    }

    const node = this.heapContainer[0];
    this.heapContainer[0] = this.heapContainer.pop();
    this.heapifyDown();

    return node;
  }

  /** 添加一个子节点 */
  public add(node: T): Heap<T> {
    this.heapContainer.push(node);
    this.heapifyUp();
    return this;
  }

  /** 移除一个子节点 */
  public remove(node: T): Heap<T>;
  // eslint-disable-next-line no-dupe-class-members
  public remove(query: (node: T) => boolean): Heap<T>;
  // eslint-disable-next-line no-dupe-class-members
  public remove(node: T | ((node: T) => boolean)): Heap<T> {
    const nodeToRemoveNumber = this.findIndex(v => {
      if (typeof node === 'function') {
        return (node as Function)(v);
      } else {
        return v === node;
      }
    });
    nodeToRemoveNumber.forEach(indexToRemove => {
      if (indexToRemove === this.heapContainer.length - 1) {
        this.heapContainer.pop();
      } else {
        this.heapContainer[indexToRemove] = this.heapContainer.pop();
        const parent = this.parent(indexToRemove);

        if (
          this.hasLeftChild(indexToRemove) &&
          (!parent || this.pairIsInCorrectOrder(parent, this.heapContainer[indexToRemove]))
        ) {
          this.heapifyDown(indexToRemove);
        } else {
          this.heapifyUp(indexToRemove);
        }
      }
    });

    return this;
  }

  public find(query: (node: T) => boolean): T[] {
    const nodeList: T[] = [];
    this.heapContainer.forEach(node => {
      if (query(node)) {
        nodeList.push(node);
      }
    });
    return nodeList;
  }

  public findIndex(query: (node: T) => boolean): number[] {
    const indexList: number[] = [];
    this.heapContainer.forEach((node, index) => {
      if (query(node)) {
        indexList.push(index);
      }
    });
    return indexList;
  }

  public isEmpty(): boolean {
    return !this.heapContainer.length;
  }

  /** 自下向上交换子节点和父节点位置 */
  public heapifyUp(customStartIndex?: number) {
    let currentIndex = customStartIndex || this.heapContainer.length - 1;

    while (
      this.hasParent(currentIndex) &&
      !this.pairIsInCorrectOrder(this.parent(currentIndex), this.heapContainer[currentIndex])
    ) {
      this.swap(this.getParentIndex(currentIndex), currentIndex);
      currentIndex = this.getParentIndex(currentIndex);
    }
  }

  /** 自上向下交换父节点和子节点位置 */
  public heapifyDown(customStartIndex = 0) {
    let currentIndex = customStartIndex;
    let nextIndex = null;

    while (this.hasLeftChild(currentIndex)) {
      if (
        this.hasRightChild(currentIndex) &&
        this.pairIsInCorrectOrder(this.rightChild(currentIndex), this.leftChild(currentIndex))
      ) {
        nextIndex = this.getRightChildIndex(currentIndex);
      } else {
        nextIndex = this.getLeftChildIndex(currentIndex);
      }

      if (
        this.pairIsInCorrectOrder(this.heapContainer[currentIndex], this.heapContainer[nextIndex])
      ) {
        break;
      }

      this.swap(currentIndex, nextIndex);
      currentIndex = nextIndex;
    }
  }

  /**
   * Checks if pair of heap elements is in correct order.
   * For MinHeap the first element must be always smaller or equal.
   * For MaxHeap the first element must be always bigger or equal.
   */
  protected pairIsInCorrectOrder(firstElement: T, secondElement: T): boolean {
    throw new Error(`
      You have to implement heap pair comparision method
      for ${firstElement} and ${secondElement} values.
    `);
  }

  public toString() {
    return this.heapContainer.toString();
  }
}
