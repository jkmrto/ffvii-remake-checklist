import {StyleSheet} from 'react-native';
import * as Colors from './../Colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.blue.light,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: '#ededed',
    paddingLeft: 14,
    paddingTop: 2,
    paddingBottom: 2,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowColor: '#000000',
    shadowOffset: {width: 2, height: 2},
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
  },
  chapter: {
    color: 'rgb(220,228,235)',
  },
});

export default styles;
