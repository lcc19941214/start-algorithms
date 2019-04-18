import Heap from './heap';

export interface Comparator<T> {
  (firstItem: T, secondItem: T): boolean;
}

export default class MinHeap<T = any> extends Heap<T> {
  private comparator?: Comparator<T>;

  public constructor(comparator?: Comparator<T>) {
    super();
    this.comparator =
      comparator ||
      (<T>(firstItem: T, secondItem: T) => {
        return firstItem < secondItem;
      });
  }

  // firstItem should always smaller than or equal to secondItem
  protected pairIsInCorrectOrder(firstItem: T, secondItem: T): boolean {
    return this.comparator(firstItem, secondItem);
  }
}
