import React, {Component} from 'react';
import {
  ScrollView,
  StyleSheet,
  Button,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

import questsList from './repositories/QuestsList';
import * as Domain from './Domain';
import * as Colors from './Colors';
import SideQuestsScreen from './screens/SideQuestsScreen';

function calculatePercentage(list: Domain.SideQuest[]): number {
  let count = 0;
  list.forEach(element => {
    if (element.checked) {
      count = count + 1;
    }
  });

  return (100 * count) / list.length;
}

const DevelopmentScreen = () => {
  return (
    <View>
      <Text> hola </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: '#888',
  },
  main: {
    flex: 1,
  },
});

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Side Quests" component={SideQuestsScreen} />
        <Drawer.Screen name="Summons" component={DevelopmentScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
