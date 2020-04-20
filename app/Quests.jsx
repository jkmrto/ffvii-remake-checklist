import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {List, ListItem} from 'react-native-elements';

class Quests extends Component {
  render() {
    return (
      <View style={{backgroundColor: '#008'}}>
        {this.props.quests.map((item, i) => (
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
    paddingLeft: 0,
    paddingTop: 0,
    paddingBottom: 0,
    marginBottom: 0,
  },
});

export default Quests;
