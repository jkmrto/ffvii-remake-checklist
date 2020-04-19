import * as React from 'react';
import {StyleSheet, Button, View, Text} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Octicons';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopWidth: 1,
    backgroundColor: '#556',
    borderTopColor: '#dddddd',
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 10,
    borderBottomColor: '#999',
  },
  title: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingRight: 20,
  },
});

function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <MenuIcon navigation={navigation} />
      <View style={styles.title}>
        <Text style={{color: '#FFF', fontSize: 18}}>Side Quests</Text>
      </View>
    </View>
  );
}

function NotificationsScreen({navigation}) {
  return (
    <View
      style={{
        flex: 1,
        marginLeft: 50,
        justifyContent: 'center',
      }}>
      <Button
        style={{alignItems: 'left'}}
        onPress={() => navigation.goBack()}
        title="Go back home"
      />
    </View>
  );
}

const Drawer = createDrawerNavigator();

const MenuIcon = ({navigation}) => (
  <Icon
    name="three-bars"
    size={30}
    color="#FFF"
    onPress={() => navigation.openDrawer()}
  />
);

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
