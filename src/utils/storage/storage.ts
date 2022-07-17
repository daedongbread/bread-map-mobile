import EncryptedStorage from 'react-native-encrypted-storage';

class Storage {
  public async get(key: string) {
    return EncryptedStorage.getItem(key);
  }
  public async set(key: string, value: string) {
    return EncryptedStorage.setItem(key, value);
  }
}

const storage = new Storage();

export { storage };
