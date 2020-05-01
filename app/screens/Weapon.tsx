import React, {Component} from 'react';
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {CheckBox} from 'react-native-elements';

import * as Domain from './../Domain';
import * as Colors from './../Colors';

var icon = require('./../assets/fandom.jpeg');

type QuestProps = {
  weapon: Domain.Weapon;
  onPressFandom: (arg0: string) => void;
  onPressCheck: (arg0: number) => void;
};

export const Weapon = ({weapon, onPressFandom, onPressCheck}: QuestProps) => (
  <View style={styles.todoContainer}>
    <View style={{flex: 0.15}}>
      <TouchableOpacity onPress={onPressFandom.bind(null, weapon.link)}>
        <Image style={{width: 30, height: 30}} source={icon} />
      </TouchableOpacity>
    </View>
    <View style={{flex: 0.4}}>
      <Text style={styles.todoText}>{weapon.name}</Text>
      <Text style={styles.chapter}> {'Chapter ' + weapon.chapter}</Text>
    </View>

    <View style={{flex: 0.25}}>
      <Text> {weapon.character}</Text>
    </View>
    <View style={{flex: 0.2}}>
      <CheckBox
        center
        checkedColor="black"
        uncheckedColor="black"
        checked={weapon.checked}
        onPress={onPressCheck.bind(null, weapon.index)}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  todoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.blue.light,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: '#ededed',
    paddingLeft: 14,
    paddingTop: 2,
    paddingBottom: 2,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowColor: '#000000',
    shadowOffset: {width: 2, height: 2},
    alignItems: 'center',
  },
  todoText: {
    fontSize: 15,
  },
  chapter: {
    color: 'rgb(220,228,235)',
  },
  subs: {
    flexDirection: 'row',
  },
});

export default Weapon;
