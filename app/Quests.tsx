import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {ListItem} from 'react-native-elements';

import * as domain from './Domain';

type Props = {
  onPress: (arg0: number) => void;
  quests: domain.SideQuest[];
};

type State = {};

class Quests extends Component<Props, State> {
  render() {
    return (
      <View style={{backgroundColor: '#FFF'}}>
        {this.props.quests.map((item: domain.SideQuest, i: number) => (
          <ListItem
            style={styles.noPadding}
            key={i}
            title={item.title}
            subtitle={
              <View style={styles.noPadding}>
                <Text style={styles.subtitleText}>
                  {'Chapter ' + item.chapter}{' '}
                </Text>
              </View>
            }
            checkBox={{
              checked: item.checked,
              onPress: this.props.onPress.bind(this, i),
            }}
            bottomDivider
          />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  subtitleText: {
    color: 'rgba(100, 150, 150, 0.6)',
  },
  noPadding: {
    paddingLeft: 0,
    paddingTop: 0,
    paddingBottom: 0,
    marginBottom: 0,
  },
});

export default Quests;
