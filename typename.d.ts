declare module 'murmurhash3' {
  type Callback = (error: Error, result: string) => void;
  type Seed = number | Callback;
  // Async variants
  export function murmur32(key: string, seed: Seed, callback?: Callback): void;
  export function murmur32Hex(
    key: string,
    seed: Seed,
    callback?: Callback,
  ): void;
  export function murmur128(key: string, seed: Seed, callback?: Callback): void;
  export function murmur128Hex(
    key: string,
    seed: Seed,
    callback?: Callback,
  ): void;
  // Sync variants
  export function murmur32Sync(key: string, seed?: number): string;
  export function murmur32HexSync(key: string, seed?: number): string;
  export function murmur128Sync(key: string, seed?: number): string;
  export function murmur128HexSync(key: string, seed?: number): string;
}
