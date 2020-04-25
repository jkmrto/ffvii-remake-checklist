import React, {Component} from 'react';
import {
  ScrollView,
  StyleSheet,
  Button,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import update from 'immutability-helper';
import {NavigationContainer} from '@react-navigation/native';

import Quests from './Quests';
import Bar from './components/Bar';
import * as SideQuestsRepo from './repositories/SideQuests';
import * as Domain from './Domain';

const lightBlue = 'rgb(176,196,222)';
const ultraLightBlue = 'rgb(240,248,255)';

type MyProps = {
  navigation: DrawerNavigationProp<any, any>;
};

type MyState = {
  title: string;
  percentage: number;
  list: Domain.SideQuest[];
  loading: boolean;
};

function calculatePercentage(list: Domain.SideQuest[]): number {
  let count = 0;
  list.forEach(element => {
    if (element.checked) {
      count = count + 1;
    }
  });

  return (100 * count) / list.length;
}

class SideQuestsScreen extends Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
    this.state = {
      title: 'Side Quests',
      list: [],
      percentage: 0,
      loading: true,
    };
  }

  async componentDidMount() {
    try {
      let quests = await SideQuestsRepo.LoadQuests();
      this.setState({
        loading: false,
        list: quests,
        percentage: calculatePercentage(quests),
      });
    } catch (err) {
      console.log('Error fetching data-----------', err);
    }
  }

  onPress(item: number) {
    let newChecked = !this.state.list[item].checked;
    let list = update(this.state.list, {[item]: {checked: {$set: newChecked}}});

    this.setState({
      list: list,
      percentage: calculatePercentage(list),
    });

    SideQuestsRepo.updateOne(list[item]);
  }

  render() {
    if (!this.state.loading) {
      return (
        <View style={styles.main}>
          <Bar
            percentage={this.state.percentage}
            title={this.state.title}
            navigation={this.props.navigation}
          />
          <ScrollView style={styles.container}>
            <Quests
              onPress={this.onPress.bind(this)}
              quests={this.state.list}
            />
          </ScrollView>
        </View>
      );
    } else {
      return <ActivityIndicator />;
    }
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

function SummonsScreen({
  navigation,
}: {
  navigation: DrawerNavigationProp<any, any>;
}) {
  let title = 'Summons';
  return (
    <View>
      <Bar title={title} navigation={navigation} percentage={80} />
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
