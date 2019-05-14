import MaxHeap, { Comparator } from '../maxHeap';

describe('max-heap', () => {
  it('should add items and heapify them up', () => {
    const maxHeap = new MaxHeap<number>();
    maxHeap.add(100);
    maxHeap.add(90);
    maxHeap.add(40);
    maxHeap.add(60);
    maxHeap.add(70);
    maxHeap.add(50);
    maxHeap.add(80);

    expect(maxHeap.toString()).toBe('100,90,80,60,70,40,50');
  });

  it('should remove items and heapify them down', () => {
    const maxHeapA = new MaxHeap<number>();
    maxHeapA
      .add(100)
      .add(90)
      .add(40)
      .add(60)
      .add(70)
      .add(50)
      .add(80)
      .remove(v => v === 70);
    expect(maxHeapA.toString()).toBe('100,90,80,60,50,40');

    maxHeapA.remove(40);
    expect(maxHeapA.toString()).toBe('100,90,80,60,50');

    maxHeapA.remove(100);
    expect(maxHeapA.toString()).toBe('90,60,80,50');

    const maxHeapB = new MaxHeap<number>()
      .add(100)
      .add(90)
      .add(40)
      .add(60)
      .add(70)
      .add(70)
      .add(50)
      .add(85)
      .add(80)
      .add(55)
      .add(30);

    maxHeapB.remove(70);
    expect(maxHeapB.toString()).toBe('100,90,50,85,55,40,30,60,80');
  });

  it('should peek the head item', () => {
    const maxHeap = new MaxHeap<number>();
    maxHeap
      .add(90)
      .add(30)
      .add(100)
      .add(50);
    expect(maxHeap.peek()).toBe(100);

    maxHeap.remove(100);
    expect(maxHeap.peek()).toBe(90);

    const emptyMaxHeap = new MaxHeap<number>();
    expect(emptyMaxHeap.peek()).toBeNull();
  });

  it('should poll the head item and heapify down the heap', () => {
    const maxHeap = new MaxHeap<number>()
      .add(100)
      .add(90)
      .add(40)
      .add(60)
      .add(70)
      .add(50)
      .add(80);

    expect(maxHeap.poll()).toBe(100);
    expect(maxHeap.toString()).toBe('90,70,80,60,50,40');

    expect(maxHeap.poll()).toBe(90);
    expect(maxHeap.toString()).toBe('80,70,40,60,50');

    const maxHeapB = new MaxHeap<number>().add(100);
    expect(maxHeapB.poll()).toBe(100);
    expect(maxHeapB.isEmpty()).toBe(true);

    const emptyMaxHeap = new MaxHeap<number>();
    expect(emptyMaxHeap.poll()).toBeNull();
  });

  it('should find items entities and index', () => {
    const maxHeap = new MaxHeap<number>()
      .add(100)
      .add(40)
      .add(90)
      .add(50)
      .add(90)
      .add(30)
      .add(90);
    expect(maxHeap.find(v => v === 90)).toEqual([90, 90, 90]);
    expect(maxHeap.findIndex(v => v === 90)).toEqual([1, 2, 6]);
  });

  it('should compare items with custom comparator', () => {
    interface Item {
      key: string;
      value: number;
    }
    const comparator: Comparator<Item> = (first, second): boolean => {
      return first.value > second.value;
    };
    const maxHeap = new MaxHeap<Item>(comparator);
    maxHeap.add({ key: '100', value: 100 });
    maxHeap.add({ key: '90', value: 90 });
    maxHeap.add({ key: '40', value: 40 });
    maxHeap.add({ key: '60', value: 60 });
    maxHeap.add({ key: '70', value: 70 });
    maxHeap.add({ key: '50', value: 50 });
    maxHeap.add({ key: '80', value: 80 });

    expect(maxHeap.heapContainer.map(v => v.value).toString()).toBe('100,90,80,60,70,40,50');
  });

  it('should not throw error while remove a non-existed element', () => {
    const maxHeap = new MaxHeap<number>();
    expect(() => maxHeap.remove(100)).not.toThrow();
  });
});
