import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {List, ListItem} from 'react-native-elements';
import update from 'immutability-helper';

let list = [
  {id: 0, chapter: 3, title: "Chadley's Report", checked: false},
  {id: 1, chapter: 3, title: 'Lost Friends', checked: false},
  {id: 2, chapter: 3, title: 'Rat Problem', checked: false},
  {id: 3, chapter: 3, title: 'On the Prowl', checked: false},
  {id: 4, chapter: 3, title: 'Nuisance in the Factory', checked: false},
  {id: 4, chapter: 3, title: 'Nuisance in the Factory', checked: false},
  {id: 4, chapter: 3, title: 'Nuisance in the Factory', checked: false},
  {id: 4, chapter: 3, title: 'Nuisance in the Factory', checked: false},
  {id: 4, chapter: 3, title: 'Nuisance in the Factory', checked: false},
  {id: 4, chapter: 3, title: 'Nuisance in the Factory', checked: false},
  {
    id: 5,
    chapter: 10,
    title: 'Just Flew In From The Graveyard',
    checked: false,
  },
];

class Quests extends Component {
  constructor() {
    super();

    this.state = {
      list: list,
    };
  }

  onPress(item) {
    let newChecked = !this.state.list[item].checked;
    this.setState({
      list: update(this.state.list, {[item]: {checked: {$set: newChecked}}}),
    });
  }

  render() {
    return (
      <View>
        {this.state.list.map((item, i) => (
          <ListItem
            style={styles.noPadding}
            key={i}
            title={item.title}
            pad={0}
            subtitle={
              <View style={styles.noPadding}>
                <Text style={styles.subtitleText}>
                  {'Chapter ' + item.chapter}{' '}
                </Text>
              </View>
            }
            checkBox={{
              checked: item.checked,
              onPress: this.onPress.bind(this, i),
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
