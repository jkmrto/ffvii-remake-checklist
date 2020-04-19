import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Heading = () => (
  <View style={styles.header}>
    <Text style={styles.headerText}>FFVII Checklist</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    marginTop: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 40,
    color: 'rgba(0, 0, 240, 0.25)',
    fontWeight: '100',
  },
});

export default Heading;
