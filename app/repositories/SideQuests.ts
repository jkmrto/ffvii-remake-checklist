import questsList from './QuestsList';
import * as LocalStorage from './LocalStorage';
import * as Domain from './../Domain.js';

const sideQuestsCollection = 'sidequests';

export async function LoadQuests(): Promise<Domain.SideQuest[]> {
  let keys = await LocalStorage.getCollectionKeys(sideQuestsCollection);

  if (keys.length === 0) {
    console.log('Loading from scratch');
    await LocalStorage.saveAll(sideQuestsCollection, questsList);
    return questsList;
  } else {
    console.log('Loading from memory');
    let questsEntries = await LocalStorage.getByKeys(keys);
    return questsEntries.map(entry => JSON.parse(entry.value));
  }
}

export function updateOne(item: Domain.SideQuest) {
  let label = LocalStorage.buildLabel(sideQuestsCollection, item.index);
  LocalStorage.updateOne(label, JSON.stringify(item));
}
