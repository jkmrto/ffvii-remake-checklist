import * as Domain from './../Domain';
import * as types from './../types';
import * as csv from './csv';

export async function load(): Promise<Domain.DiscoveryQuest[]> {
  let discoveryQuestsRaw = await csv.load('discoveryQuests_tab.csv');
  let discoveryQuests: Domain.DiscoveryQuest[] = [];
  discoveryQuestsRaw.forEach(dic => {
    let discoveryQuest = newDiscoveryQuestFromDic(dic);
    if (discoveryQuest != null) {
      discoveryQuests.push(discoveryQuest);
    }
  });
  return discoveryQuests;
}

function newDiscoveryQuestFromDic(
  dic: types.Dic,
): Domain.DiscoveryQuest | null {
  // Strings
  if (!csv.checkFieldContainsString('TITLE', dic)) return null;
  if (!csv.checkFieldContainsString('LINK', dic)) return null;

  // Integers
  let chapter = csv.parseFieldFromDic(dic, 'CHAPTER');
  if (chapter == null) return null;

  let index = csv.parseFieldFromDic(dic, 'INDEX');
  if (index == null) return null;

  return {
    index: index,
    chapter: chapter,
    title: dic['TITLE'],
    link: dic['LINK'],
    checked: false,
  };
}
