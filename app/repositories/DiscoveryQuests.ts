import * as LocalStorage from './LocalStorage';
import {DiscoveryQuest} from './../Domain';
import * as DiscoveryQuestsCSV from './DiscoveryQuestsCSV';

import * as Types from './../types';
export const collection = 'discoveryQuests';

export async function load(): Promise<DiscoveryQuest[]> {
  let indexToStorageQuest = await LocalStorage.load(collection);
  let quests = await DiscoveryQuestsCSV.load();

  updateCheck(quests, indexToStorageQuest);

  return quests;
}

export function updateOne(item: DiscoveryQuest) {
  let label = LocalStorage.buildLabel(collection, item.index);
  LocalStorage.updateOne(label, JSON.stringify(item));
}

function updateCheck(
  quests: DiscoveryQuest[],
  indexToStorageWeapon: Types.DicNumberToMap,
) {
  for (let i = 0; i < quests.length; i++) {
    if (indexToStorageWeapon[quests[i].index] != undefined) {
      let isChecked = indexToStorageWeapon[quests[i].index]['checked'];
      if (typeof isChecked === 'boolean') {
        quests[i].checked = isChecked;
      }
    }
  }
  return quests;
}
