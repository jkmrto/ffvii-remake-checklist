import React, {Component} from 'react';
import {ScrollView, StyleSheet, View, Text, Image} from 'react-native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {WebView} from 'react-native-webview';

import update from 'immutability-helper';
import Bar from './../components/Bar';
import BackBar from './../components/BackBar';

import * as Domain from './../Domain';
import Weapon from './Weapon';
import * as Repo from './../repositories/Weapons';

type Props = {
  navigation: DrawerNavigationProp<any, any>;
};

type State = {
  title: string;
  weapons: Domain.Weapon[];
  browserOpened: boolean;
  webUri: string;
  percentage: number;
};

class WeaponsScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      browserOpened: false,
      weapons: [],
      title: 'Weapons',
      webUri: '',
      percentage: 0,
    };
  }

  async componentDidMount() {
    let weapons = await Repo.load();
    this.setState({
      weapons: weapons,
      percentage: calculatePercentage(weapons),
    });
  }

  onPressCheck(index: number) {
    let newChecked = !this.state.weapons[index].checked;
    let weapons = update(this.state.weapons, {
      [index]: {checked: {$set: newChecked}},
    });

    this.setState({
      weapons: weapons,
      percentage: calculatePercentage(weapons),
    });

    Repo.updateOne(weapons[index]);
  }

  onPressFandom(uri: string) {
    console.log('Hi from on Press Fandom');
    this.setState({
      browserOpened: true,
      webUri: uri,
    });
  }

  onPressBackFromBrowser() {
    this.setState({
      browserOpened: false,
    });
  }

  render() {
    if (this.state.browserOpened) {
      return (
        <View style={{flex: 1}}>
          <BackBar onPressBackArrow={this.onPressBackFromBrowser.bind(this)} />
          <WebComponent uri={this.state.webUri} />
        </View>
      );
    } else {
      return (
        <View style={{flex: 1}}>
          <View>
            <Bar
              title={this.state.title}
              navigation={this.props.navigation}
              percentage={this.state.percentage}
            />
          </View>
          <ScrollView>
            {this.state.weapons.map((weapon, i) => {
              return (
                <Weapon
                  key={weapon.index}
                  weapon={weapon}
                  onPressCheck={this.onPressCheck.bind(this)}
                  onPressFandom={this.onPressFandom.bind(this)}
                />
              );
            })}
          </ScrollView>
        </View>
      );
    }
  }
}

const WebComponent = ({uri}: {uri: string}) => {
  return <WebView source={{uri}} />;
};

function calculatePercentage(list: Domain.Weapon[]): number {
  let count = 0;
  list.forEach(element => {
    if (element.checked) {
      count = count + 1;
    }
  });

  return (100 * count) / list.length;
}

export default WeaponsScreen;
