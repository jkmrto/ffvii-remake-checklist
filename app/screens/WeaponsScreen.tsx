import React, {Component} from 'react';
import {ScrollView, StyleSheet, View, Text} from 'react-native';

import * as Domain from './../Domain';
import Weapon from './Weapon';
import * as WeaponRepo from './../repositories/Weapons';

type Props = {};

type State = {
  weapons: Domain.Weapon[];
};

class WeaponsScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      weapons: [],
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
        <ScrollView>
          {this.state.weapons.map((weapon, i) => {
            return <Weapon key={i} weapon={weapon} />;
          })}
        </ScrollView>
      </View>
    );
  }
}

export default WeaponsScreen;
