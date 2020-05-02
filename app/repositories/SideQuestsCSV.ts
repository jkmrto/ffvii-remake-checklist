import * as Domain from './../Domain';
import * as types from './../types';
import * as csv from './csv';

export async function load(): Promise<Domain.SideQuest[]> {
  let sideQuestsRaw = await csv.load('sideQuests.csv');
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
  if (!csv.checkFieldContainsString('TITLE', dic)) return null;

  let chapter = csv.parseFieldFromDic(dic, 'CHAPTER');
  if (chapter == null) return null;

  let index = csv.parseFieldFromDic(dic, 'INDEX');
  if (index == null) return null;

  return {
    index: index,
    title: dic['TITLE'],
    chapter: chapter,
    checked: false,
  };
}
