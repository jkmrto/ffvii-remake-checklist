import React from 'react';
import {SafeAreaView, ScrollView, View, Text} from 'react-native';
import {
  createDrawerNavigator,
  DrawerItems,
  DrawerContentComponentProps,
} from 'react-navigation-drawer';

import {createAppContainer} from 'react-navigation';
import CircularProgress from './components/CircularProgress';

// Screens
import SideQuestsScreen from './screens/SideQuestsScreen';
import WeaponsScreen from './screens/WeaponsScreen';

import * as GlobalContext from './GlobalContext';

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
