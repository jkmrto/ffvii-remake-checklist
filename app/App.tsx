import React, {Component} from 'react';
import {
  ScrollView,
  StyleSheet,
  Button,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import update from 'immutability-helper';
import {NavigationContainer} from '@react-navigation/native';

import Quests from './Quests';
import Bar from './components/Bar';
import * as SideQuestsRepo from './repositories/SideQuests';
import questsList from './repositories/QuestsList';
import * as Domain from './Domain';
import * as Colors from './Colors';

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
    color: '#888',
  },
  main: {
    flex: 1,
  },
});

type QuestProps = {
  onPress: (arg0: number) => void;
  quest: Domain.SideQuest;
};

const Todo = ({quest, onPress}: QuestProps) => (
  <View style={stylesTodo.todoContainer}>
    <View style={{flex: 0.8}}>
      <Text style={stylesTodo.todoText}>{quest.title}</Text>
      <Text style={stylesTodo.chapter}> {'Chapter ' + quest.chapter}</Text>
    </View>

    <View style={{flex: 0.2}}>
      <CheckBox
        center
        checkedColor="black"
        uncheckedColor="black"
        checked={quest.checked}
        onPress={onPress.bind(null, quest.index)}
      />
    </View>
  </View>
);

class SummonsScreen extends Component<MyProps, MyState> {
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

  onPress(questIndex: number) {
    let newChecked = !this.state.list[questIndex].checked;
    let list = update(this.state.list, {
      [questIndex]: {checked: {$set: newChecked}},
    });

    this.setState({
      list: list,
      percentage: calculatePercentage(list),
    });

    SideQuestsRepo.updateOne(list[questIndex]);
  }

  render() {
    return (
      <View>
        <Bar
          title={this.state.title}
          navigation={this.props.navigation}
          percentage={80}
        />
        <View>
          <ScrollView>
            {this.state.list.map((quest, i) => {
              return (
                <Todo
                  key={quest.index}
                  quest={quest}
                  onPress={this.onPress.bind(this)}
                />
              );
            })}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const stylesTodo = StyleSheet.create({
  todoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.blue.light,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: '#ededed',
    paddingLeft: 14,
    paddingTop: 2,
    paddingBottom: 2,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowColor: '#000000',
    shadowOffset: {width: 2, height: 2},
    alignItems: 'center',
  },
  todoText: {
    fontSize: 15,
  },
  chapter: {
    color: 'rgb(220,228,235)',
  },
});

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
