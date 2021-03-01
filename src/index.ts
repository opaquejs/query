export type Queryable = Record<string, unknown>;

type DistributeComparisons<S extends Queryable, K extends keyof S> = K extends any ? AtomicComparison<K, S[K]> : never;

export type NormalizedQuery<Subject extends Queryable = Record<string, unknown>> = OpaqueQueryRootEntries &
  NormalizedSubQuery<Subject>;

export type NormalizedSubQuery<Subject extends Queryable = Record<string, unknown>> =
  | {}
  | OrConnector<Subject>
  | AndConnector<Subject>
  | DistributeComparisons<Subject, keyof Subject>;

export type OrConnector<Subject extends Queryable = Record<string, unknown>> = {
  _or: NormalizedSubQuery<Subject>[];
};
export type AndConnector<Subject extends Queryable = Record<string, unknown>> = {
  _and: NormalizedSubQuery<Subject>[];
};

export type GenericAtomicComparison<Key, Comparator, Value> = {
  key: Key;
  comparator: Comparator;
  value: Value;
};

export type ComaparisonTypes<Value> = {
  "==": Value;
  "!=": Value;
  "<": Value;
  ">": Value;
  "<=": Value;
  ">=": Value;
  in: Value[];
};

type DistributeAtomicComparison<Key, Comparator extends keyof ComaparisonTypes<Value>, Value> = Comparator extends any
  ? GenericAtomicComparison<Key, Comparator, ComaparisonTypes<Value>[Comparator]>
  : never;
export type AtomicComparison<Key = string, Value = unknown> = DistributeAtomicComparison<
  Key,
  keyof ComaparisonTypes<any>,
  Value
>;

export type OpaqueQueryRootEntries = {
  _limit?: number;
  _skip?: number;
};
