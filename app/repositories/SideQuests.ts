import questsList from './QuestsList';
import * as LocalStorage from './LocalStorage';
import * as domain from './../domain/Domain.js';

const sideQuestsCollection = 'sidequests';

export async function LoadQuests(): Promise<domain.SideQuest[]> {
  let keys = await LocalStorage.getCollectionKeys(sideQuestsCollection);
  if (keys.length === 0) {
    await LocalStorage.saveAll(sideQuestsCollection, questsList);
    return questsList;
  } else {
    try {
      let questsEntries = await LocalStorage.getByKeys(keys);
      return questsEntries.map(entry => JSON.parse(entry.value));
    } catch (e) {
      console.error(e);
      return [];
    }
  }
}

export function updateOne(item: domain.SideQuest) {
  console.log(item);
  let label = LocalStorage.buildLabel(sideQuestsCollection, item.index);
  LocalStorage.updateOne(label, JSON.stringify(item));
  console.log(label);
}
