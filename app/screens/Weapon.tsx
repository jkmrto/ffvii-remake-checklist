import React, {Component} from 'react';
import {ScrollView, StyleSheet, View, Text} from 'react-native';
import {CheckBox} from 'react-native-elements';

import * as Domain from './../Domain';
import * as Colors from './../Colors';

type QuestProps = {
  weapon: Domain.Weapon;
};

export const Weapon = ({weapon}: QuestProps) => (
  <View style={styles.todoContainer}>
    <View style={{flex: 0.8}}>
      <Text style={styles.todoText}>{weapon.name}</Text>
      <Text style={styles.chapter}> {'Chapter ' + weapon.chapter}</Text>
    </View>

    <View style={{flex: 0.2}}>
      <CheckBox
        center
        checkedColor="black"
        uncheckedColor="black"
        checked={false}
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
});

export default Weapon;