import React, {Component} from 'react';
import {ScrollView, StyleSheet, View, Text, Image} from 'react-native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {WebView} from 'react-native-webview';

import Bar from './../components/Bar';
import BackBar from './../components/BackBar';

import * as Domain from './../Domain';
import Weapon from './Weapon';
import * as WeaponRepo from './../repositories/Weapons';

type Props = {
  navigation: DrawerNavigationProp<any, any>;
};

type State = {
  title: string;
  weapons: Domain.Weapon[];
  browserOpened: boolean;
  webUri: string;
};

class WeaponsScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      browserOpened: false,
      weapons: [],
      title: 'Weapons',
      webUri: '',
    };
  }

  async componentDidMount() {
    let weapons = await WeaponRepo.loadWeapons();
    this.setState({
      weapons: weapons,
    });
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
        <View>
          <View>
            <Bar
              title={this.state.title}
              navigation={this.props.navigation}
              percentage={80}
            />
          </View>
          <ScrollView>
            {this.state.weapons.map((weapon, i) => {
              return (
                <Weapon
                  key={weapon.index}
                  weapon={weapon}
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

export default WeaponsScreen;
