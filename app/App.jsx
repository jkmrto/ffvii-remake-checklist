import * as React from 'react';
import {StyleSheet, Button, View, Text} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Octicons';

const lightBlue = 'rgb(176,196,222)';
const ultraLightBlue = 'rgb(240,248,255)';

const Bar = ({navigation, title}) => (
  <View style={styles.container}>
    <MenuIcon navigation={navigation} />
    <View style={styles.title}>
      <Text style={{color: ultraLightBlue, fontSize: 20}}>{title}</Text>
    </View>
  </View>
);

function SideQuestsScreen({navigation}) {
  let title = 'Side Quests';
  return (
    <View>
      <Bar title={title} navigation={navigation} />
      <View style={styles.title}>
        <Text>{title}</Text>
      </View>
    </View>
  );
}

function SummonsScreen({navigation}) {
  let title = 'Summons';
  return (
    <View>
      <Bar title={title} navigation={navigation} />
      <View style={styles.title}>
        <Text>{title}</Text>
      </View>
    </View>
  );
}

const Drawer = createDrawerNavigator();

const MenuIcon = ({navigation}) => (
  <Icon
    name="three-bars"
    size={30}
    color={lightBlue}
    onPress={() => navigation.openDrawer()}
  />
);

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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopWidth: 1,
    backgroundColor: '#334',
    borderTopColor: '#dddddd',
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 10,
    borderBottomColor: lightBlue,
  },
  title: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingRight: 20,
  },
});
