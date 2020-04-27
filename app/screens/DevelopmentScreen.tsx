import React, {Component} from 'react';
import * as fs from 'react-native-fs';
import {View, Text} from 'react-native';

type Props = {};

type State = {};

const file = './../repositories.csv';

export type Weapon = {
  name: string;
  character: boolean;
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

class DevelopmentScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    var weaponsRaw = await loadCSV('weapons.csv');
    console.log(weaponsRaw);
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
