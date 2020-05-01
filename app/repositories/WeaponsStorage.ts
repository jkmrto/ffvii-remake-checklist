import * as LocalStorage from './LocalStorage';
import * as Domain from './../Domain';
import * as Types from './../types';

const weaponsCollection = 'weapons';

export async function load(): Promise<Types.DicNumberToMap> {
  let keys = await LocalStorage.getCollectionKeys(weaponsCollection);
  let entries = await LocalStorage.getByKeys(keys);

  let indexToWeapon: Types.DicNumberToMap = {};
  entries.forEach((entry: LocalStorage.Entry) => {
    indexToWeapon[entry.index] = JSON.parse(entry.value);
  });
  return indexToWeapon;
}

export function updateOne(item: Domain.Weapon) {
  let label = LocalStorage.buildLabel(weaponsCollection, item.index);
  LocalStorage.updateOne(label, JSON.stringify(item));
}
