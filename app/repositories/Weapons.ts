import * as Domain from './../Domain';
import * as WeaponsCSV from './WeaponsCSV';
import * as WeaponsStorage from './WeaponsStorage';

export async function load(): Promise<Domain.Weapon[]> {
  let indexToStorageData = await WeaponsStorage.load();
  let weapons = await WeaponsCSV.load();

  for (let i = 0; i < weapons.length; i++) {
    if (indexToStorageData[weapons[i].index] != undefined) {
      let isChecked = indexToStorageData[weapons[i].index]['checked'];
      if (typeof isChecked === 'boolean') {
        weapons[i].checked = isChecked;
      }
    }
  }
  return weapons;
}

export function updateOne(item: Domain.Weapon) {
  WeaponsStorage.updateOne(item);
}
