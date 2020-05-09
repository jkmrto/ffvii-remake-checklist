import * as Domain from './../Domain';
import * as types from './../types';
import * as csv from './csv';

export async function load(): Promise<Domain.SideQuest[]> {
  let sideQuestsRaw = await csv.load('sideQuests_tab.csv');
  let sideQuests: Domain.SideQuest[] = [];
  sideQuestsRaw.forEach(dic => {
    let sideQuest = newSideQuestFromDic(dic);
    if (sideQuest != null) {
      sideQuests.push(sideQuest);
    }
  });
  return sideQuests;
}

function newSideQuestFromDic(dic: types.Dic): Domain.SideQuest | null {
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
    title: dic['TITLE'],
    link: dic['LINK'],
    chapter: chapter,
    checked: false,
  };
}
