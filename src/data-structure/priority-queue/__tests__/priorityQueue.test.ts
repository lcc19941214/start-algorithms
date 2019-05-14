import PriorityQueue from '../priorityQueue';

describe('priority queue', () => {
  it('should initialize a priority queue', () => {
    const priorityQueue = new PriorityQueue();
    expect(priorityQueue).toBeDefined();
  });

  it('should add element and sort them with given priority', () => {
    const priorityQueue = new PriorityQueue<number>();

    priorityQueue.add(1, 10);
    expect(priorityQueue.peek()).toBe(1);

    priorityQueue.add(2, 5);
    expect(priorityQueue.peek()).toBe(2);

    priorityQueue.add(3, 15);
    expect(priorityQueue.peek()).toBe(2);
  });

  it('should keep object as element', () => {
    const priorityQueue = new PriorityQueue<object>();
    const a = { name: 'a' };
    const b = { name: 'b' };
    const c = { name: 'c' };

    priorityQueue.add(a, 10);
    expect(priorityQueue.peek()).toBe(a);

    priorityQueue.add(b, 5);
    expect(priorityQueue.peek()).toBe(b);

    priorityQueue.add(c, 15);
    expect(priorityQueue.peek()).toBe(b);
  });

  it('should automatically change priority after poll an element', () => {
    const priorityQueue = new PriorityQueue<number>();
    priorityQueue.add(1, 100);
    priorityQueue.add(2, 0);
    priorityQueue.add(3, 0);
    priorityQueue.add(5, 50);

    expect(priorityQueue.poll()).toBe(2);
    expect(priorityQueue.poll()).toBe(3);
    expect(priorityQueue.poll()).toBe(5);
    expect(priorityQueue.poll()).toBe(1);
  });

  it('should change order after updatePriority', () => {
    const priorityQueue = new PriorityQueue<number>();
    priorityQueue.add(1, 100);
    priorityQueue.add(2, 0);
    priorityQueue.add(3, 0);
    priorityQueue.add(4, 50);

    priorityQueue.updatePriority(1, 0);
    priorityQueue.updatePriority(2, 0);
    priorityQueue.updatePriority(3, 50);
    priorityQueue.updatePriority(4, 20);

    priorityQueue.add(5, 15);

    expect(priorityQueue.poll()).toBe(2);
    expect(priorityQueue.poll()).toBe(1);
    expect(priorityQueue.poll()).toBe(5);
    expect(priorityQueue.poll()).toBe(4);
    expect(priorityQueue.poll()).toBe(3);
  });
});
