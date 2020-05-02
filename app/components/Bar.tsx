import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import * as Colors from './../Colors';

const Bar = ({
  navigation,
  title,
  percentage,
}: {
  navigation: DrawerNavigationProp<any, any>;
  title: string;
  percentage: number;
}) => (
  <View style={styles.container}>
    <MenuIcon navigation={navigation} />
    <Text style={{color: Colors.blue.ultraLight, fontSize: 20}}>{title}</Text>
    <Text style={{color: Colors.blue.ultraLight, fontSize: 20}}>
      {percentage.toFixed(0) + '%'}
    </Text>
  </View>
);

const MenuIcon = ({
  navigation,
}: {
  navigation: DrawerNavigationProp<any, any>;
}) => (
  <Icon
    name="three-bars"
    size={30}
    color={'white'}
    onPress={() => navigation.openDrawer()}
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
export default Bar;
