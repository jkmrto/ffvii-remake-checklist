import React, {Component} from 'react';
import {ScrollView, StyleSheet, View, Text} from 'react-native';
import {DrawerNavigationProp} from '@react-navigation/drawer';

import Bar from './../components/Bar';
import * as Domain from './../Domain';
import Weapon from './Weapon';
import * as WeaponRepo from './../repositories/Weapons';

type Props = {
  navigation: DrawerNavigationProp<any, any>;
};

type State = {
  title: string;
  weapons: Domain.Weapon[];
};

class WeaponsScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      weapons: [],
      title: 'Weapons',
    };
  }

  async componentDidMount() {
    let weapons = await WeaponRepo.loadWeapons();
    this.setState({
      weapons: weapons,
    });
  }

  render() {
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
            return <Weapon key={weapon.index} weapon={weapon} />;
          })}
        </ScrollView>
      </View>
    );
  }
}

export default WeaponsScreen;
