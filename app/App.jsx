import * as React from 'react';
import {ScrollView, StyleSheet, Button, View, Text} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

import Quests from './Quests.jsx';
import Bar from './components/Bar.jsx';

const lightBlue = 'rgb(176,196,222)';
const ultraLightBlue = 'rgb(240,248,255)';

function SideQuestsScreen({navigation}) {
  let title = 'Side Quests';
  return (
    <View>
      <Bar title={title} navigation={navigation} />
      <ScrollView>
        <Quests />
      </ScrollView>
    </View>
  );
}

function SummonsScreen({navigation}) {
  let title = 'Summons';
  return (
    <View>
      <Bar title={title} navigation={navigation} />
      <View>
        <Text>{title}</Text>
      </View>
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Side Quests" component={SideQuestsScreen} />
        <Drawer.Screen name="Summons" component={SummonsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
