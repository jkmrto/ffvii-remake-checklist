import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import * as Colors from './../Colors';

type Props = {
  onPressBackArrow: () => void;
};

const BackBar = ({onPressBackArrow}: Props) => (
  <View style={styles.container}>
    <BackIcon onPressBackArrow={onPressBackArrow} />
  </View>
);

const BackIcon = ({onPressBackArrow}: Props) => (
  <Icon
    name="arrow-left"
    size={30}
    color={'white'}
    onPress={onPressBackArrow}
  />
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    backgroundColor: '#334',
    borderTopColor: '#eee',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 5,
    borderBottomColor: 'white',
  },
});
export default BackBar;
