import * as fs from 'react-native-fs';
import * as types from './../types';

export async function load(pathToFile: string): Promise<types.Dic[]> {
  var listDics: types.Dic[] = [];

  var fileContents = await fs.readFileAssets(pathToFile, 'utf8');
  var lines = fileContents.split('\n');
  var keys = lines[0].split('\t');

  var contentRows = lines.slice(1, lines.length);
  contentRows.forEach((row, rowIndex) => {
    let dic: types.Dic = {};
    var lineSplit = row.split('\t');
    if (lineSplit.length == keys.length) {
      for (var i = 0; i < lineSplit.length; i++) {
        dic[keys[i]] = lineSplit[i];
      }
      listDics.push(dic);
    } else {
      // Escape error if it is last row
      if (row === '' && rowIndex == contentRows.length - 1) {
        return;
      }
      console.log(
        'Error parsing this row: ',
        row,
        '\nExpected length: ',
        keys.length,
        ', Gotten Length: ',
        lineSplit.length,
      );
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
