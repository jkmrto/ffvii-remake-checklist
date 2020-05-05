import React, {useState, useEffect} from 'react';
import {ScrollView, View} from 'react-native';
import update from 'immutability-helper';
import {DrawerNavigationProp} from '@react-navigation/drawer';

import Bar from './../components/Bar';
import * as SideQuestsRepo from './../repositories/SideQuests';
import SideQuest from './SideQuest';
import * as Domain from './../Domain';
import * as Common from './../Common';

import * as GlobalContext from './../GlobalContext';

type Props = {
  navigation: DrawerNavigationProp<any, any>;
};

const SideQuestsScreenTest = (props: Props) => {
  const [list, setList] = useState<Domain.SideQuest[]>([]);
  const [percentage, setPercentage] = useState<number>(0);
  let statsContext = GlobalContext.useTheme();

  let onPress = (index: number) => {
    let newChecked = !list[index].checked;

    let updatedList = update(list, {
      [index]: {checked: {$set: newChecked}},
    });
    setList(updatedList);
    setPercentage(Common.calculatePercentage(updatedList));
    SideQuestsRepo.updateOne(list[index]);

    //Update Stats
    var stats = Common.calculateStats(updatedList);
    statsContext.setStats([stats]);
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
        {list.map(quest => {
          return (
            <SideQuest key={quest.index} quest={quest} onPress={onPress} />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default SideQuestsScreenTest;
