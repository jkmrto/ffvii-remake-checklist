import React, {Component} from 'react';
import {
  ScrollView,
  StyleSheet,
  Button,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';

import update from 'immutability-helper';
import {DrawerNavigationProp} from '@react-navigation/drawer';

import * as SideQuestsRepo from './../repositories/SideQuests';
import * as Domain from './../Domain';
import Bar from './../components/Bar';
import SideQuest from './SideQuest';

type MyProps = {
  navigation: DrawerNavigationProp<any, any>;
};

type MyState = {
  title: string;
  percentage: number;
  list: Domain.SideQuest[];
  loading: boolean;
};

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
                <SideQuest
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

function calculatePercentage(list: Domain.SideQuest[]): number {
  let count = 0;
  list.forEach(element => {
    if (element.checked) {
      count = count + 1;
    }
  });

  return (100 * count) / list.length;
}

export default SideQuestsScreen;
