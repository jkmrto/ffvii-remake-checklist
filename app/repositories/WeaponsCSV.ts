import * as Domain from './../Domain';
import * as types from './../types';
import * as csv from './csv';

export async function load(): Promise<Domain.Weapon[]> {
  let weaponsRaw = await csv.load('weapons_tab.csv');
  let weapons: Domain.Weapon[] = [];
  weaponsRaw.forEach(dic => {
    let weapon = newWeaponFromDic(dic);
    if (weapon != null) {
      weapons.push(weapon);
    }
  });
  return weapons;
}

function newWeaponFromDic(dic: types.Dic): Domain.Weapon | null {
  if (!csv.checkFieldContainsString('WEAPON', dic)) return null;
  if (!csv.checkFieldContainsString('CHARACTER', dic)) return null;
  if (!csv.checkFieldContainsString('LINK', dic)) return null;
  if (!csv.checkFieldContainsString('LOCATION', dic)) return null;

  let chapter = csv.parseFieldFromDic(dic, 'CHAPTER');
  if (chapter == null) return null;

  let index = csv.parseFieldFromDic(dic, 'INDEX');
  if (index == null) return null;

  return {
    index: index,
    name: dic['WEAPON'],
    character: dic['CHARACTER'],
    chapter: chapter,
    location: dic['LOCATION'],
    link: dic['LINK'],
    checked: false,
  };
}
