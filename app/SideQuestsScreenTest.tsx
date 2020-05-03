import React, {Component, useState, useEffect} from 'react';
import {ScrollView, View, Text} from 'react-native';
import update from 'immutability-helper';

import Bar from './components/Bar';
import * as GlobalContext from './GlobalContext';
import * as SideQuestsRepo from './repositories/SideQuests';
import * as SQContext from './SideQuestsContext';
import * as Domain from './Domain';
import SideQuest from './screens/SideQuest';

import {DrawerNavigationProp} from '@react-navigation/drawer';
import * as Common from './Common';

type Props = {
  navigation: DrawerNavigationProp<any, any>;
};

const SideQuestsScreenTest = (props: Props) => {
  const [list, setList] = useState<Domain.SideQuest[]>([]);
  const [percentage, setPercentage] = useState<number>(0);

  const sideQuests = SQContext.use();
  const theme = GlobalContext.useTheme();

  let onPress = (index: number) => {
    let newChecked = !list[index].checked;

    let updatedList = update(list, {
      [index]: {checked: {$set: newChecked}},
    });
    setList(updatedList);
    setPercentage(Common.calculatePercentage(updatedList));
    //SideQuestsRepo.updateOne(list[questIndex]);
  };

  useEffect(() => {
    async function mountQuestList() {
      let quests = await SideQuestsRepo.LoadQuests();
      setList(quests);
      setPercentage(Common.calculatePercentage(quests));
    }
    mountQuestList();
  }, []);

  return (
    <View>
      <Bar
        title="Side Quests"
        navigation={props.navigation}
        percentage={percentage}
      />
      <ScrollView>
        {list.map((quest, i) => {
          return (
            <SideQuest key={quest.index} quest={quest} onPress={onPress} />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default SideQuestsScreenTest;
