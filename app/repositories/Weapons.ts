import * as fs from 'react-native-fs';
import * as Domain from './../Domain';

interface Dic {
  [key: string]: string;
}

export async function loadCSV(pathToFile: string): Promise<Dic[]> {
  var listDics: Dic[] = [];

  var fileContents = await fs.readFileAssets(pathToFile, 'utf8');
  var lines = fileContents.split('\n');
  var keys = lines[0].split(',');

  lines.slice(1, lines.length).forEach(line => {
    let dic: Dic = {};
    var lineSplit = line.split(',');
    if (lineSplit.length == keys.length) {
      for (var i = 0; i < lineSplit.length; i++) {
        dic[keys[i]] = lineSplit[i];
      }
      listDics.push(dic);
    }
  });

  return listDics;
}

function checkFieldContainsString(field: string, dic: Dic): boolean {
  if (dic[field] == null || typeof dic[field] != 'string') {
    console.log('Unvalid value: ', dic[field]);
    return false;
  } else {
    return true;
  }
}

function newWeaponFromDic(dic: Dic): Domain.Weapon | null {
  if (!checkFieldContainsString('WEAPON', dic)) return null;
  if (!checkFieldContainsString('CHARACTER', dic)) return null;
  if (!checkFieldContainsString('LINK', dic)) return null;
  if (!checkFieldContainsString('LOCATION', dic)) return null;

  let chapter = parseInt(dic['CHAPTER']);
  if (isNaN(chapter)) {
    console.log('Unvalid value: ', dic['CHAPTER']);
  }

  return {
    name: dic['WEAPON'],
    character: dic['CHARACTER'],
    chapter: chapter,
    location: dic['LOCATION'],
    link: dic['LINK'],
  };
}

export async function loadWeapons(): Promise<Domain.Weapon[]> {
  let weaponsRaw = await loadCSV('weapons.csv');
  let weapons: Domain.Weapon[] = [];
  weaponsRaw.forEach(dic => {
    let weapon = newWeaponFromDic(dic);
    if (weapon != null) {
      weapons.push(weapon);
    }
  });
  return weapons;
}
