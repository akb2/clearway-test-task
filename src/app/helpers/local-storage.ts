import { LocalStorageItemInterface } from "@app/models/app";

export const LocalStorageDefaultTtl: number = 604800;

export const LocalStorageSet = (key: string, value: any, ttl: number = LocalStorageDefaultTtl): void => {
  const now: number = (new Date()).getTime();
  const expiry: number = !!ttl ? now + (ttl * 1000) : 0;

  localStorage.setItem(key, JSON.stringify({ value, expiry }));
};

export const LocalStorageRemove = (key: string): void => localStorage.removeItem(key);

export const LocalStorageGet = <T = any>(key: string, typeCallback: (d: any) => T = d => d as T): T => {
  const itemStr: string = localStorage.getItem(key)?.toString();
  const now: number = (new Date()).getTime();

  if (itemStr) {
    try {
      const item: LocalStorageItemInterface = JSON.parse(itemStr) as LocalStorageItemInterface;

      if (now <= item.expiry || item.expiry <= 0) {
        try {
          return typeCallback(JSON.parse(item.value));
        }

        catch (e: any) {
          return typeCallback(item.value);
        }
      }

      else {
        LocalStorageRemove(key);
      }
    }

    catch (e) {
      LocalStorageRemove(key);
    }
  }

  return typeCallback("");
};
