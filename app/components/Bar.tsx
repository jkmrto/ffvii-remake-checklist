import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import {DrawerNavigationProp} from '@react-navigation/drawer';

const lightBlue = 'rgb(176,196,222)';
const ultraLightBlue = 'rgb(240,248,255)';

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
    <Text style={{color: ultraLightBlue, fontSize: 20}}>{title}</Text>
    <Text style={{color: ultraLightBlue, fontSize: 20}}>
      {percentage + '%'}
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
    color={lightBlue}
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
    borderBottomWidth: 10,
    borderBottomColor: lightBlue,
  },
});
export default Bar;
