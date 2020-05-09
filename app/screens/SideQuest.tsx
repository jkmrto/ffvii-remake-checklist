import React from 'react';
import {View, Text} from 'react-native';
import {CheckBox} from 'react-native-elements';

import * as Domain from './../Domain';
import FandomIcon from './../components/FandomIcon';
import styles from './ItemStyle';

type QuestProps = {
  quest: Domain.Quest;
  onPressCheck: (arg0: number) => void;
  onPressFandom: (arg0: string) => void;
};

export const SideQuest = ({quest, onPressCheck, onPressFandom}: QuestProps) => (
  <View style={styles.container}>
    <View style={{flex: 0.2}}>
      <FandomIcon onPress={onPressFandom} link={quest.link} />
    </View>
    <View style={{flex: 0.6}}>
      <Text style={styles.title}>{quest.title}</Text>
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

export default SideQuest;
