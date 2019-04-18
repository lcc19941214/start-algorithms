import Heap from '../heap';

describe('heap', () => {
  it('should not be called as a constructor directly', () => {
    const useHeapAsConstructor = () => {
      // @ts-ignore: for test
      const heap = new Heap();
      heap.add(5);
    };
    expect(useHeapAsConstructor).toThrow();
  });
});
