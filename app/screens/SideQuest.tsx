import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {CheckBox} from 'react-native-elements';

import * as Colors from './../Colors';
import * as Domain from './../Domain';
import FandomIcon from './../components/FandomIcon';

type QuestProps = {
  quest: Domain.SideQuest;
  onPressCheck: (arg0: number) => void;
  onPressFandom: (arg0: string) => void;
};

export const SideQuest = ({quest, onPressCheck, onPressFandom}: QuestProps) => (
  <View style={styles.todoContainer}>
    <View style={{flex: 0.2}}>
      <FandomIcon onPress={onPressFandom} link={quest.link} />
    </View>
    <View style={{flex: 0.6}}>
      <Text style={styles.todoText}>{quest.title}</Text>
      <Text style={styles.chapter}> {'Chapter ' + quest.chapter}</Text>
    </View>
    <View style={{flex: 0.2}}>
      <CheckBox
        center
        checkedColor="black"
        uncheckedColor="black"
        checked={quest.checked}
        onPress={onPressCheck.bind(null, quest.index)}
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

export default SideQuest;
