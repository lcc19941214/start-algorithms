import MinHeap, { Comparator } from '../minHeap';

describe('min-heap', () => {
  it('should add items and heapify them up', () => {
    const minHeap = new MinHeap<number>();
    minHeap.add(100);
    minHeap.add(90);
    minHeap.add(40);
    minHeap.add(60);
    minHeap.add(70);
    minHeap.add(50);
    minHeap.add(80);

    expect(minHeap.toString()).toBe('40,60,50,100,70,90,80');
  });

  it('should remove items and heapify them down', () => {
    const minHeapA = new MinHeap<number>();
    minHeapA
      .add(100)
      .add(90)
      .add(40)
      .add(60)
      .add(70)
      .add(50)
      .add(80)
      .remove(50);
    expect(minHeapA.toString()).toBe('40,60,80,100,70,90');

    minHeapA.remove(40);
    expect(minHeapA.toString()).toBe('60,70,80,100,90');

    minHeapA.remove(60);
    expect(minHeapA.toString()).toBe('70,90,80,100');

    const minHeapB = new MinHeap<number>()
      .add(100)
      .add(90)
      .add(40)
      .add(60)
      .add(70)
      .add(70)
      .add(50)
      .add(85)
      .add(80)
      .add(50)
      .add(30);
    expect(minHeapB.toString()).toBe('30,40,50,80,50,90,70,100,85,70,60');

    minHeapB.remove(50);
    expect(minHeapB.toString()).toBe('30,40,60,80,70,90,70,100,85');
  });

  it('should peek the head item', () => {
    const minHeap = new MinHeap<number>();
    minHeap
      .add(90)
      .add(30)
      .add(100)
      .add(50);
    expect(minHeap.peek()).toBe(30);

    minHeap.remove(30);
    expect(minHeap.peek()).toBe(50);

    const emptyMaxHeap = new MinHeap<number>();
    expect(emptyMaxHeap.peek()).toBeNull();
  });

  it('should poll the head item and heapify down the heap', () => {
    const minHeap = new MinHeap<number>()
      .add(100)
      .add(90)
      .add(40)
      .add(60)
      .add(70)
      .add(50)
      .add(80);

    expect(minHeap.poll()).toBe(40);
    expect(minHeap.toString()).toBe('50,60,80,100,70,90');

    expect(minHeap.poll()).toBe(50);
    expect(minHeap.toString()).toBe('60,70,80,100,90');

    const minHeapB = new MinHeap<number>().add(100);
    expect(minHeapB.poll()).toBe(100);
    expect(minHeapB.isEmpty()).toBe(true);
    
    const emptyMaxHeap = new MinHeap<number>();
    expect(emptyMaxHeap.poll()).toBeNull();
  });

  it('should find items entities and index', () => {
    const minHeap = new MinHeap<number>()
      .add(100)
      .add(40)
      .add(90)
      .add(50)
      .add(90)
      .add(30)
      .add(90);
    expect(minHeap.find(v => v === 90)).toEqual([90, 90, 90]);
    expect(minHeap.findIndex(v => v === 90)).toEqual([4, 5, 6]);
  });

  it('should compare items with custom comparator', () => {
    interface Item {
      key: string;
      value: number;
    }
    const comparator: Comparator<Item> = (first, second): boolean => {
      return first.value < second.value;
    };
    const minHeap = new MinHeap<Item>(comparator);
    minHeap.add({ key: '100', value: 100 });
    minHeap.add({ key: '90', value: 90 });
    minHeap.add({ key: '40', value: 40 });
    minHeap.add({ key: '60', value: 60 });
    minHeap.add({ key: '70', value: 70 });
    minHeap.add({ key: '50', value: 50 });
    minHeap.add({ key: '80', value: 80 });

    expect(minHeap.heapContainer.map(v => v.value).toString()).toBe('40,60,50,100,70,90,80');
  });
});
