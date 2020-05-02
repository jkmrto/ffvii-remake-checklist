import React, {Component} from 'react';
import {CircularProgress} from 'react-native-svg-circular-progress';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Button,
  View,
  Text,
} from 'react-native';
//import {createDrawerNavigator, DrawerItemList} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

import {
  createDrawerNavigator,
  DrawerItems,
  DrawerContentComponentProps,
} from 'react-navigation-drawer';

import {createAppContainer} from 'react-navigation';
import * as Domain from './Domain';
import * as Colors from './Colors';

// Screens
import SideQuestsScreen from './screens/SideQuestsScreen';
import WeaponsScreen from './screens/WeaponsScreen';

function calculatePercentage(list: Domain.SideQuest[]): number {
  let count = 0;
  list.forEach(element => {
    if (element.checked) {
      count = count + 1;
    }
  });

  return (100 * count) / list.length;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: '#888',
  },
  main: {
    flex: 1,
  },
});

const CustomDrawerContentComponent = (props: DrawerContentComponentProps) => (
  <ScrollView>
    <SafeAreaView style={stylesMeh.container}>
      <Text>Percentage : 100% </Text>
      <CircularProgress percentage={50} />
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);

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

const App = createAppContainer(Drawer);
export default App;

const stylesMeh = StyleSheet.create({
  container: {
    flex: 1,
  },
});
