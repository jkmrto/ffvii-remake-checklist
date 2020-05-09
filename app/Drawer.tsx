import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View, Text} from 'react-native';
import {
  createDrawerNavigator,
  DrawerItems,
  DrawerContentComponentProps,
} from 'react-navigation-drawer';

import * as Colors from './Colors';
import CircularProgress from './components/CircularProgress';

// Screens
import SideQuestsScreen from './screens/SideQuestsScreen';
import DiscoveryQuestsScreen from './screens/DiscoveryQuestsScreen';
import WeaponsScreen from './screens/WeaponsScreen';

import * as StatsContext from './StatsContext';
import * as StatsRepo from './repositories/Stats';

const CustomDrawerContentComponent = (props: DrawerContentComponentProps) => {
  const theme = StatsContext.use();

  useEffect(() => {
    async function mountDrawer() {
      console.log('Mounting Drawer');
      let stats = await StatsRepo.load();
      theme.initStats(stats);
    }
    mountDrawer();
  }, []);

  return (
    <ScrollView>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Final Fantasy VII Remake</Text>
          <Text style={styles.titleText}>Checklist</Text>
        </View>

        <DrawerItems {...props} />
        <View style={styles.circularProgressContainer}>
          <CircularProgress percentage={theme.percentage * 100}>
            <View>
              <Text>{(theme.percentage * 100).toFixed(0)}%</Text>
            </View>
          </CircularProgress>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const Drawer = createDrawerNavigator(
  {
    'Side Quests': {
      screen: SideQuestsScreen,
    },
    'Discovery Quests': {
      screen: DiscoveryQuestsScreen,
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

const styles = StyleSheet.create({
  circularProgressContainer: {
    flex: 1,
    marginTop: 15,
    marginRight: 20,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  titleContainer: {
    backgroundColor: Colors.blue.dark,
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  titleText: {
    fontSize: 20,
    color: '#eee',
  },
});

export default Drawer;
