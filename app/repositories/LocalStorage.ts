import AsyncStorage from '@react-native-community/async-storage';

export function buildLabel(collection: string, index: number) {
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

type Entry = {
  index: number;
  key: string;
  value: string;
};

function getIndexFromKey(str: string): number | null {
  let res: string[] = str.split('_');
  return parseInt(res[1]);
}

export async function getByKeys(keys: string[]): Promise<Entry[]> {
  let entries: Entry[] = [];
  let rawFound = await AsyncStorage.multiGet(keys);

  // Map to valid Entries
  rawFound.forEach(function(item) {
    let index = getIndexFromKey(item[0]);
    if (index != null) {
      if (item[1] != null) {
        entries.push({
          index: index,
          key: item[0],
          value: item[1],
        });
      } else {
        console.log('Something wrong happen with: ' + item[0]);
      }
    } else {
      console.log('Error parsing index from key: ' + item[0]);
    }
  });

  //Sort by Index
  entries.sort(function(a: Entry, b: Entry) {
    if (a.index < b.index) return -1;
    if (a.index > b.index) return 1;
    return 0;
  });

  return entries;
}

export function saveAll(collection: string, list: any[]) {
  let formattedList = list.map(item => {
    return [buildLabel(collection, item.index), JSON.stringify(item)];
  });

  AsyncStorage.multiSet(formattedList);
}
