import Heap from './heap';

type comparator = <T>(firstItem: T, secondItem: T) => boolean;

export default class MaxHeap<T> extends Heap<T> {
  private comparator?: comparator;

  public constructor(comparator: comparator) {
    super();
    this.comparator =
      comparator ||
      (<T>(firstItem: T, secondItem: T) => {
        return firstItem > secondItem;
      });
  }

  // firstItem should always greater than or equal to secondItem
  protected pairIsInCorrectOrder(firstItem: T, secondItem: T): boolean {
    return this.comparator(firstItem, secondItem);
  }
}
