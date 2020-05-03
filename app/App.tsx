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

class CustomDrawerContentComponent extends Component<
  DrawerContentComponentProps,
  State
> {
  componentDidMount() {
    console.log('hasta luego');
  }

  render() {
    return (
      <ScrollView>
        <SafeAreaView style={stylesMeh.container}>
          <Text>Percentage : 100% </Text>
          <CircularProgress percentage={50} />
          <DrawerItems {...this.props} />
        </SafeAreaView>
      </ScrollView>
    );
  }
}

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
