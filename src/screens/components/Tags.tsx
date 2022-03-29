import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export const Tag = ({type, text, id, href}) => {
  const navigation = useNavigation();

  const open = () => {
    if (id && href) {
      navigation.push('Details', {id, href});
    } else if (type) {
      navigation.push('Home', {query: `${type}:${text}`});
    } else {
      navigation.push('Home', {query: text});
    }
  };

  return (
    <TouchableOpacity style={styles.tag} onPress={open}>
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export const Tags = ({type, items}) => (
  <View style={styles.container}>
    {items.map((item, index) => (
      <Tag
        key={item.id || index}
        text={item.name || item}
        type={type}
        {...item}
      />
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: -4,
  },
  tag: {
    alignItems: 'center',
    backgroundColor: '#111111',
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
    margin: 4,
    paddingHorizontal: 16,
  },
  text: {
    color: '#e6eaee',
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
  },
});
