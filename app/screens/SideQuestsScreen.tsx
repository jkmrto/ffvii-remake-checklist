import React, {useState, useEffect} from 'react';
import {ScrollView, View} from 'react-native';
import update from 'immutability-helper';
import {DrawerNavigationProp} from '@react-navigation/drawer';

import Bar from './../components/Bar';
import BackBar from './../components/BackBar';
import WebComponent from './../components/WebComponent';

import * as Repo from './../repositories/SideQuests';
import * as Domain from './../Domain';
import * as Common from './../Common';

import SideQuest from './SideQuest';
import * as StatsContext from './../StatsContext';

type Props = {
  navigation: DrawerNavigationProp<any, any>;
};

type WebScreen = {
  uri: string;
  opened: boolean;
};

const SideQuestsScreen = (props: Props) => {
  const [quests, setQuests] = useState<Domain.SideQuest[]>([]);
  const [percentage, setPercentage] = useState<number>(0);
  const [webScreen, setWebScreen] = useState<WebScreen>({
    uri: '',
    opened: false,
  });

  let statsContext = StatsContext.use();

  useEffect(() => {
    async function mountQuestList() {
      let quests = await Repo.load();
      setQuests(quests);
      setPercentage(Common.calculatePercentage(quests));
    }
    mountQuestList();
  }, []);

  let onPressCheck = (index: number) => {
    let newChecked = !quests[index].checked;

    let updatedList = update(quests, {
      [index]: {checked: {$set: newChecked}},
    });
    setQuests(updatedList);
    setPercentage(Common.calculatePercentage(updatedList));
    Repo.updateOne(quests[index]);

    //Update Stats
    var stats = Common.calculateStats(updatedList);
    statsContext.updateStats(Repo.collection, stats);
  };

  let onPressFandom = (uri: string) => {
    setWebScreen({uri: uri, opened: true});
  };

  let onPressBackFromBrowser = () => {
    setWebScreen({uri: '', opened: false});
  };

  if (webScreen.opened) {
    return (
      <View style={{flex: 1}}>
        <BackBar onPressBackArrow={onPressBackFromBrowser} />
        <WebComponent uri={webScreen.uri} />
      </View>
    );
  } else {
    return (
      <View style={{flex: 1}}>
        <View>
          <Bar
            title="Side Quests"
            navigation={props.navigation}
            percentage={percentage}
          />
        </View>
        <ScrollView>
          {quests.map(quest => {
            return (
              <SideQuest
                key={quest.index}
                quest={quest}
                onPressCheck={onPressCheck}
                onPressFandom={onPressFandom}
              />
            );
          })}
        </ScrollView>
      </View>
    );
  }
};

export default SideQuestsScreen;
