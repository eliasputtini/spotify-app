import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as Actions from '../../actions';

export const Filter = ({category, selected}) => {
  const dispatch = useDispatch();

  const toggle = () => dispatch(Actions.toggleFilter(category, !selected));

  return (
    <TouchableOpacity style={styles.filter} onPress={toggle}>
      <View style={[styles.unselected, selected && styles.selected]}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>
          {category}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export const SearchFilters = () => {
  const filters = useSelector(state => state.filters);

  return (
    <View style={styles.container}>
      {filters.map((filter, index) => (
        <Filter key={index} {...filter} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 20,
    marginHorizontal: -4,
    paddingHorizontal: 20,
  },
  filter: {
    flexGrow: 1,
    flexShrink: 0,
    marginHorizontal: 4,
  },
  text: {
    color: '#e6eaee',
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
    textTransform: 'capitalize',
  },
  unselected: {
    alignItems: 'center',
    backgroundColor: '#111111',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ababab',
    height: 40,
    justifyContent: 'center',
  },
  selected: {
    backgroundColor: '#3f8045',
    borderColor: '#1DB954',
  },
});
