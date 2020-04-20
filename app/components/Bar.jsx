import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';

const lightBlue = 'rgb(176,196,222)';
const ultraLightBlue = 'rgb(240,248,255)';

const Bar = ({navigation, title, percentage}) => (
  <View style={styles.container}>
    <MenuIcon style={{paddingTop: 5}} navigation={navigation} />
    <Text style={{color: ultraLightBlue, fontSize: 20}}>{title}</Text>
    <Text style={{color: ultraLightBlue, fontSize: 20}}>
      {percentage + '%'}
    </Text>
  </View>
);

const MenuIcon = ({navigation}) => (
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
