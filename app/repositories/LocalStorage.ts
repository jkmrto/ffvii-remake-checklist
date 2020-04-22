import AsyncStorage from '@react-native-community/async-storage';

export function buildLabel(collection, index) {
  return collection + '_' + index;
}

export async function updateOne(key: string, value: string) {
  let err = await AsyncStorage.mergeItem(key, value);
  if (err != null) {
    console.log(err);
  }
}

export async function getCollectionKeys(collection: string) {
  let keys = await AsyncStorage.getAllKeys();

  let filteredKeys = keys.filter(key => {
    let res = key.split('_');
    return res[0] === collection;
  });
  return filteredKeys;
}

export async function getByKeys(keys: string[]) {
  return AsyncStorage.multiGet(keys);
}

export function saveAll(collection: string, list: any[]) {
  let formattedList = list.map(item => {
    return [buildLabel(collection, item.index), JSON.stringify(item)];
  });

  AsyncStorage.multiSet(formattedList);
}
