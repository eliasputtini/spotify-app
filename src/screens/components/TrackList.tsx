import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export const Track = ({index, name, duration_ms, id, href}) => {
  const navigation = useNavigation();

  const getDetails = () => navigation.push('Details', {id, href});

  const formatDuration = ms => {
    const h = Math.floor(ms / 1000 / 60 / 60);
    const m = Math.floor((ms / 1000 / 60 / 60 - h) * 60);
    const s = Math.floor(((ms / 1000 / 60 / 60 - h) * 60 - m) * 60);
    return [h, m, s]
      .filter((value, index) => (index === 0 ? value > 0 : true)) // Remove hours if the value is 0
      .map(value => (value < 10 ? '0' + value : value)) // Prefix single digits with 0
      .join(':');
  };

  return (
    <TouchableOpacity style={styles.track} onPress={getDetails}>
      <Text style={styles.index}>{++index + '.'}</Text>
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
        {name}
      </Text>
      <Text style={styles.duration}>{formatDuration(duration_ms)}</Text>
    </TouchableOpacity>
  );
};

export const TrackList = ({items}) => (
  <View style={styles.container}>
    {items.map((item, index) => (
      <Track
        key={item.id || item?.track.id}
        index={index}
        {...item}
        {...item?.track}
      />
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    flexDirection: 'column',
    marginVertical: -4,
  },
  track: {
    alignItems: 'center',
    backgroundColor: '#111111',
    borderRadius: 5,
    flexDirection: 'row',
    height: 40,
    marginVertical: 4,
    paddingHorizontal: 16,
  },
  index: {
    color: '#ababab',
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
  },
  title: {
    color: '#e6eaee',
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
    flex: 1,
    marginHorizontal: 8,
  },
  duration: {
    color: '#ababab',
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
  },
});
