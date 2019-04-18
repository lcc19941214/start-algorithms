import HashTable from '../hashTable';

describe.only('hash table', () => {
  it('create a hashTable with specific size', () => {
    expect(new HashTable(24).buckets.length).toBe(24);
    expect(new HashTable(64).buckets.length).toBe(64);
  });

  it('should generate hash for keys', () => {});

  it('should set, get and delete value by key', () => {
    const table = new HashTable<string>();
    table.set('a', 'a');
    table.set('b', 'b');
    table.set('c', 'c');

    expect(table.has('a')).toBe(true);
    expect(table.has('b')).toBe(true);
    expect(table.has('d')).toBe(false);

    expect(table.get('a')).toBe('a');
    expect(table.get('b')).toBe('b');
    expect(table.get('c')).toBe('c');
    expect(table.get('d')).toBeUndefined();

    table.set('c', 'cc');

    expect(table.delete('a')).toBe(true);
    expect(table.delete('b')).toBe(true);
    expect(table.delete('d')).toBe(false);

    expect(table.has('a')).toBe(false);
    expect(table.has('b')).toBe(false);
    expect(table.has('c')).toBe(true);

    expect(table.get('c')).toBe('cc');
  });

  it('should track actual keys', () => {
    const table = new HashTable<number | string>();
    table.set('2', 2);
    table.set('a', 'a');
    table.set('3', 3);
    table.set('1', 1);
    table.set('b', 'b');

    expect(table.getKeys().sort()).toEqual(['1', '2', '3', 'a', 'b']);
    expect(new HashTable().getKeys()).toEqual([]);
  });
});
