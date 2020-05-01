import * as fs from 'react-native-fs';
import * as types from './../types';

export async function load(pathToFile: string): Promise<types.Dic[]> {
  var listDics: types.Dic[] = [];

  var fileContents = await fs.readFileAssets(pathToFile, 'utf8');
  var lines = fileContents.split('\n');
  var keys = lines[0].split(',');

  lines.slice(1, lines.length).forEach(line => {
    let dic: types.Dic = {};
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

export function checkFieldContainsString(
  field: string,
  dic: types.Dic,
): boolean {
  if (dic[field] == null || typeof dic[field] != 'string') {
    console.log('Unvalid value: ', dic[field]);
    return false;
  } else {
    return true;
  }
}

export function parseFieldFromDic(
  dic: types.Dic,
  field: string,
): number | null {
  let chapter = parseInt(dic[field]);
  if (isNaN(chapter)) {
    console.log('Unvalid value: ', dic[field]);
    return null;
  }
  return chapter;
}
