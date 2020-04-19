import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';

import Heading from './Heading.jsx';
import Quests from './Quests.jsx';

const App = () => (
  <View>
    <Heading />
    <ScrollView>
      <Quests />
    </ScrollView>
  </View>
);

export default App;

//function buildIdToMissionMap(missions) {
//  let map = {};
//  list.forEach(elem => {
//    map[elem.id] = elem;
//  });
//
//  return map;
//}
