import { SearchEntity } from '@/apis/bakery/types';
import { storage } from '@/utils/storage/storage';

export const getStorageSearchHistory = async (): Promise<SearchEntity[]> => {
  const res = await storage.get('search');
  if (!res) {
    return [];
  }

  return JSON.parse(res);
};

export const setStorageSearchHistory = (searchHistory: SearchEntity[]) => {
  storage.set('search', searchHistory);
};
