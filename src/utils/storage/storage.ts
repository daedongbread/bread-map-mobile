import EncryptedStorage from 'react-native-encrypted-storage';

class Storage {
  public async get(key: string) {
    return EncryptedStorage.getItem(key);
  }
  public async set(key: string, value: unknown) {
    const stringifyValue = JSON.stringify(value);

    return EncryptedStorage.setItem(key, stringifyValue);
  }
}

const storage = new Storage();

export { storage };
