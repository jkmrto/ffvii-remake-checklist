import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';

var icon = require('./../assets/fandom.jpeg');

type Props = {
  onPress: (arg0: string) => void;
  link: string;
};

const FandomIcon = ({onPress, link}: Props) => (
  <TouchableOpacity onPress={onPress.bind(null, link)}>
    <Image style={style.fandom} source={icon} />
  </TouchableOpacity>
);

const style = StyleSheet.create({
  fandom: {
    borderWidth: 3,
    borderColor: 'rgb(128, 128, 128)',
    borderRadius: 5,
    width: 35,
    height: 35,
  },
});

export default FandomIcon;
