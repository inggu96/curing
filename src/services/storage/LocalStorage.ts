export const STORAGE_KEYS = {
  ACCESS_TOKEN: "ACCESS_TOKEN",
};

export type StorageKey = keyof typeof STORAGE_KEYS;

class LocalStorage {
  get(key: string) {
    return localStorage.getItem(key);
  }

  save(key: string, value: any) {
    return localStorage.setItem(key, value);
  }

  delete(key: string) {
    return localStorage.removeItem(key);
  }
}

export default new LocalStorage();
