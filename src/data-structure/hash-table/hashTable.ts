import LinkedList from '../linked-list';

const DEFAULT_BUCKETS_SIZE = 32;
type hashGenerator = (key: string) => number;
interface BucketItem<T = any> {
  key: string;
  value: T;
}

export default class HashTable<T = any> {
  private keys: { [key: string]: number };
  public buckets: LinkedList<BucketItem<T>>[];
  private hashGenerator?: hashGenerator;

  public constructor(size = DEFAULT_BUCKETS_SIZE, hashGenerator?: hashGenerator) {
    this.keys = {};
    this.buckets = Array.from(Array(size)).map(() => new LinkedList<BucketItem<T>>());
    this.hashGenerator = hashGenerator || this.hash;
  }

  private hash(key: string): number {
    const hash = Array.from(key).reduce((code, str) => code + str.charCodeAt(0), 0);
    return hash % this.buckets.length;
  }

  public set(key: string, value: T): T {
    const hash = this.hashGenerator(key);
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

  public get(key: string) {
    const hash = this.keys[key];
    const bucket = this.buckets[hash];
    if (bucket) {
      const node = bucket.find(node => node.value.key === key);
      if (node) {
        return node.value.value;
      }
    }

    return undefined;
  }

  public delete(key: string): boolean {
    const hash = this.keys[key];
    const bucket = this.buckets[hash];
    if (bucket) {
      const node = bucket.find(node => node.value.key === key);
      if (node) {
        delete this.keys[key];
        return bucket.remove(node.value);
      }
    }

    return false;
  }

  public has(key: string): boolean {
    return Object.prototype.hasOwnProperty.call(this.keys, key);
  }

  public getKeys(): string[] {
    return Object.keys(this.keys);
  }
}
