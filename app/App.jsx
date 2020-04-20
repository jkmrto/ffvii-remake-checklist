import React, {Component} from 'react';
import {ScrollView, StyleSheet, Button, View, Text} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import update from 'immutability-helper';
import {useNavigation} from '@react-navigation/native';

import Quests from './Quests.jsx';
import Bar from './components/Bar.jsx';
import questsList from './QuestsList.jsx';

const lightBlue = 'rgb(176,196,222)';
const ultraLightBlue = 'rgb(240,248,255)';

class SideQuestsScreen extends Component {
  constructor() {
    super();
    this.state = {
      title: 'Side Quests',
      list: questsList,
      percentage: 0,
    };
  }

  onPress(item) {
    let newChecked = !this.state.list[item].checked;
    let list = update(this.state.list, {[item]: {checked: {$set: newChecked}}});
    let count = 0;
    list.forEach(element => {
      if (element.checked) {
        count = count + 1;
      }
    });

    this.setState({
      list: list,
      percentage: ((100 * count) / list.length).toFixed(0),
    });
  }

  render() {
    return (
      <View style={styles.main}>
        <Bar
          percentage={this.state.percentage}
          title={this.state.title}
          navigation={this.props.navigation}
        />
        <ScrollView style={styles.container}>
          <Quests onPress={this.onPress.bind(this)} quests={this.state.list} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  main: {
    flex: 1,
  },
});

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
