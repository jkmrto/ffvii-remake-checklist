import React, {Component} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Button,
  View,
  Text,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerItems,
  DrawerContentComponentProps,
} from 'react-navigation-drawer';

import {createAppContainer} from 'react-navigation';
import * as Domain from './Domain';
import * as Colors from './Colors';
import CircularProgress from './components/CircularProgress';

// Screens
import SideQuestsScreen from './screens/SideQuestsScreen';
import WeaponsScreen from './screens/WeaponsScreen';

import * as GlobalContext from './GlobalContext';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: '#888',
  },
  main: {
    flex: 1,
  },
});

type State = {};

const CustomDrawerContentComponent = (props: DrawerContentComponentProps) => {
  const theme = GlobalContext.useTheme();

  return (
    <ScrollView>
      <SafeAreaView style={{flex: 1}}>
        <DrawerItems {...props} />
        <CircularProgress percentage={theme.isOnline}>
          <View>
            <Text>{theme.isOnline}%</Text>
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

const AppContainer = createAppContainer(Drawer);
const App = () => {
  return (
    <GlobalContext.GlobalContextProvider>
      <AppContainer />
    </GlobalContext.GlobalContextProvider>
  );
};

export default App;
