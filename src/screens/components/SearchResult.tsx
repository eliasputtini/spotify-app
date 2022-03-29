import React from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export const SearchResult = ({id, href, name, images, artists, genres}) => {
  const navigation = useNavigation();

  const minHeight = 100;
  const image =
    images?.length &&
    (images.some(image => image.height)
      ? images
          .sort((image1, image2) => image1.height - image2.height)
          .find(image => image.height >= minHeight)
      : images.find(image => image.url));

  const getDetails = () => navigation.push('Details', {id, href});

  return (
    <TouchableOpacity style={styles.container} onPress={getDetails}>
      {image?.url && (
        <Image
          source={{uri: image.url}}
          resizeMethod="resize"
          resizeMode="cover"
          style={styles.image}
        />
      )}
      <View style={styles.info}>
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.title}>
          {name}
        </Text>
        {artists?.length > 0 && (
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.details}>
            {artists.map(artist => artist.name).join(', ')}
          </Text>
        )}
        {genres?.length > 0 && (
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.details}>
            {genres.join(', ')}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    flexDirection: 'row',
    backgroundColor: '#232323',
  },
  info: {
    flex: 1,
    padding: 20,
  },
  title: {
    color: '#e6eaee',
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
  },
  details: {
    color: '#ababab',
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
  },
  image: {
    width: 100,
    height: 100,
  },
});
