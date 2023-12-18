import { isEmpty } from 'lodash-es';

export type StorageKey = 'auth';

class StorageService {
   static save<T>(key: StorageKey, value: T) {
      localStorage.setItem(key, JSON.stringify(value));
   }

   static load(key: StorageKey) {
      const rawData = localStorage.getItem(key) || '';
      const data = isEmpty(rawData) ? null : JSON.parse(rawData);
      return data;
   }

   static clear(key: StorageKey) {
      localStorage.removeItem(key);
   }
}

export default StorageService;
