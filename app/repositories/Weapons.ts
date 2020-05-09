import * as LocalStorage from './LocalStorage';
import * as Domain from './../Domain';
import * as WeaponsCSV from './WeaponsCSV';

export const collection = 'weapons';

export async function load(): Promise<Domain.Weapon[]> {
  let indexToStorageWeapon = await LocalStorage.load(collection);
  let weapons = await WeaponsCSV.load();

  for (let i = 0; i < weapons.length; i++) {
    if (indexToStorageWeapon[weapons[i].index] != undefined) {
      let isChecked = indexToStorageWeapon[weapons[i].index]['checked'];
      if (typeof isChecked === 'boolean') {
        weapons[i].checked = isChecked;
      }
    }
  }
  return weapons;
}

export function updateOne(item: Domain.Weapon) {
  let label = LocalStorage.buildLabel(collection, item.index);
  LocalStorage.updateOne(label, JSON.stringify(item));
}
