import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView, View, Text} from 'react-native';
import {
  createDrawerNavigator,
  DrawerItems,
  DrawerContentComponentProps,
} from 'react-navigation-drawer';

import CircularProgress from './components/CircularProgress';

// Screens
import SideQuestsScreen from './screens/SideQuestsScreen';
import WeaponsScreen from './screens/WeaponsScreen';

import * as GlobalContext from './GlobalContext';
import * as StatsRepo from './repositories/Stats';

const CustomDrawerContentComponent = (props: DrawerContentComponentProps) => {
  const theme = GlobalContext.useTheme();

  useEffect(() => {
    async function mountDrawer() {
      console.log('Mounting');
      let stats = await StatsRepo.load();
      theme.initStats(stats);
    }
    mountDrawer();
  }, []);

  return (
    <ScrollView>
      <SafeAreaView style={{flex: 1}}>
        <DrawerItems {...props} />
        <CircularProgress percentage={theme.percentage * 100}>
          <View>
            <Text>{(theme.percentage * 100).toFixed(0)}%</Text>
          </View>
        </CircularProgress>
      </SafeAreaView>
    </ScrollView>
  );
};

const Drawer = createDrawerNavigator(
  {
    'Side Quests': {
      screen: SideQuestsScreen,
    },
    Weapons: {
      screen: WeaponsScreen,
    },
  },
  {
    initialRouteName: 'Side Quests',
    contentComponent: CustomDrawerContentComponent,
    contentOptions: {
      activeTintColor: '#000000',
      activeBackgroundColor: '#e6e6e6',
    },
  },
);

export default Drawer;
