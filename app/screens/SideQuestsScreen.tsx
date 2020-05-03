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
import * as Common from './../Common';
import Bar from './../components/Bar';
import SideQuest from './SideQuest';

type Props = {
  navigation: DrawerNavigationProp<any, any>;
};

type State = {
  title: string;
  percentage: number;
  list: Domain.SideQuest[];
  loading: boolean;
};

class SideQuestsScreen extends Component<Props, State> {
  constructor(props: Props) {
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
      console.log('Mounting');
      let quests = await SideQuestsRepo.LoadQuests();
      this.setState({
        loading: false,
        list: quests,
        percentage: Common.calculatePercentage(quests),
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
      percentage: Common.calculatePercentage(list),
    });

    SideQuestsRepo.updateOne(list[questIndex]);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Bar
          title={this.state.title}
          navigation={this.props.navigation}
          percentage={this.state.percentage}
        />
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
    );
  }
}

export default SideQuestsScreen;
