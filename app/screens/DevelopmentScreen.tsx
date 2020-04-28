import React, {Component} from 'react';
import * as fs from 'react-native-fs';
import {View, Text} from 'react-native';

type Props = {};

type State = {};

const file = './../repositories.csv';

export type Weapon = {
  name: string;
  character: string;
  chapter: number;
  location: string;
  link: string;
};

interface Dic {
  [key: string]: string;
}

async function loadCSV(pathToFile: string): Promise<Dic[]> {
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

function newWeaponFromDic(dic: Dic): Weapon | null {
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

class DevelopmentScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    var weaponsRaw = await loadCSV('weapons.csv');
    let weapons: Weapon[] = [];
    weaponsRaw.forEach(dic => {
      let weapon = newWeaponFromDic(dic);
      if (weapon != null) {
        weapons.push(weapon);
      }
    });

    console.log(weapons);
  }

  render() {
    console.log('Loading CSV');
    return (
      <View>
        <Text> Development Screen </Text>
      </View>
    );
  }
}

export default DevelopmentScreen;
