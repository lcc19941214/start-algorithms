import MinHeap from '../heap/minHeap';

export interface Comparator<T> {
  (firstItem: T, secondItem: T): boolean;
}

export default class PriorityQueue<T = any> {
  private comparator?: Comparator<T>;
  private priorities?: Map<any, number>;
  private heap: MinHeap<T>;

  public constructor(comparator?: Comparator<T>) {
    // compare element with priority
    this.comparator =
      comparator ||
      (<T>(firstItem: T, secondItem: T) => {
        const firstPriority = this.priorities.get(firstItem);
        const secondPriority = this.priorities.get(secondItem);
        let rst: number;
        if (firstPriority === secondPriority) {
          rst = 0;
        } else {
          rst = firstPriority < secondPriority ? -1 : 1;
        }
        return rst === 0 || rst === -1;
      });

    // use Map to record the priority
    this.priorities = new Map();
    this.heap = new MinHeap(this.comparator);
  }

  public add(node: T, priority: number): PriorityQueue<T> {
    // set priority before heap add node to ensure heap can access the latest priority
    this.priorities.set(node, priority);
    this.heap.add(node);
    return this;
  }

  public remove(node: T): PriorityQueue<T> {
    this.heap.remove(node);
    this.priorities.delete(node);
    return this;
  }

  public peek(): T {
    return this.heap.peek();
  }

  public poll(): T {
    return this.heap.poll();
  }

  /** change the priority */
  public updatePriority(node: T, priority: number): PriorityQueue<T> {
    this.remove(node);
    this.add(node, priority);
    return this;
  }
}
