import * as LocalStorage from './LocalStorage';
import * as SideQuestsCSV from './SideQuestsCSV';
import * as Domain from './../Domain.js';

export const collection = 'sidequests';

export async function LoadQuests(): Promise<Domain.SideQuest[]> {
  let sideQuests = await SideQuestsCSV.load();
  let indexToStorageSideQuest = await LocalStorage.load(collection);

  for (let i = 0; i < sideQuests.length; i++) {
    if (indexToStorageSideQuest[sideQuests[i].index] != undefined) {
      let isChecked = indexToStorageSideQuest[sideQuests[i].index]['checked'];
      if (typeof isChecked === 'boolean') {
        sideQuests[i].checked = isChecked;
      }
    }
  }
  return sideQuests;
}

export function updateOne(item: Domain.SideQuest) {
  let label = LocalStorage.buildLabel(collection, item.index);
  LocalStorage.updateOne(label, JSON.stringify(item));
}
