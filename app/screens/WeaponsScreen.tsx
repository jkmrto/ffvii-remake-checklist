import React, {useState, useEffect} from 'react';
import {ScrollView, View} from 'react-native';
import update from 'immutability-helper';
import {DrawerNavigationProp} from '@react-navigation/drawer';

import Bar from './../components/Bar';
import BackBar from './../components/BackBar';
import WebComponent from './../components/WebComponent';
import Weapon from './Weapon';

import * as Repo from './../repositories/Weapons';
import * as Domain from './../Domain';
import * as Common from './../Common';
import * as StatsContext from './../StatsContext';

type Props = {
  navigation: DrawerNavigationProp<any, any>;
};

type WebScreen = {
  uri: string;
  opened: boolean;
};

const WeaponsScreen = (props: Props) => {
  const [weapons, setWeapons] = useState<Domain.Weapon[]>([]);
  const [percentage, setPercentage] = useState<number>(0);
  const [webScreen, setWebScreen] = useState<WebScreen>({
    uri: '',
    opened: false,
  });

  let statsContext = StatsContext.use();

  useEffect(() => {
    async function mountWeapons() {
      let weapons = await Repo.load();
      setWeapons(weapons);
      setPercentage(Common.calculatePercentage(weapons));
    }
    mountWeapons();
  }, []);

  let onPressCheck = (index: number) => {
    let newChecked = !weapons[index].checked;

    let updatedList = update(weapons, {
      [index]: {checked: {$set: newChecked}},
    });
    setWeapons(updatedList);
    setPercentage(Common.calculatePercentage(updatedList));
    Repo.updateOne(weapons[index]);

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
            title={'Weapons'}
            navigation={props.navigation}
            percentage={percentage}
          />
        </View>
        <ScrollView>
          {weapons.map(weapon => {
            return (
              <Weapon
                key={weapon.index}
                weapon={weapon}
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

export default WeaponsScreen;
