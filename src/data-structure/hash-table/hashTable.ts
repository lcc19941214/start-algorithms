import LinkedList from '../linked-list';

const DEFAULT_BUCKETS_SIZE = 32;
type hashGenerator = (key: string) => number;
interface BucketItem<T = any> {
  key: string;
  value: T;
}

export default class HashTable<T> {
  private keys: { [key: string]: number };
  private buckets: LinkedList<BucketItem<T>>[];
  private hashGenerator?: hashGenerator;

  public constructor(size = DEFAULT_BUCKETS_SIZE, hashGenerator?: hashGenerator) {
    this.keys = {};
    this.buckets = [...Array(size)].map(() => new LinkedList<BucketItem<T>>());
    this.hashGenerator = hashGenerator;
  }

  private hash(key: string): number {
    const hash = key;
    return hash.length;
  }

  public set(key: string, value: T): T {
    const hash = this.hash(key);
    this.keys[key] = hash;
    const bucket = this.buckets[hash];
    const node = bucket.find(node => node.value.key === key);

    if (!node) {
      // insert a new node
      bucket.append({ key, value });
    } else {
      // update node value
      node.value.value = value;
    }

    return value;
  }

  public get(key: string) {}

  public delete(key: string): boolean {}

  public has(key: string): boolean {}

  public getKeys(): string[] {
    return Object.keys(this.keys);
  }
}
