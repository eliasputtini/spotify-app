import React, {useEffect, useRef, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

import * as Actions from '../../../actions';

import {Container, Input} from './styles';

import Icon from 'react-native-vector-icons/MaterialIcons';

export const SearchInput = ({query = ''}) => {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [text, setText] = useState(query);

  useEffect(() => {
    if (text) {
      search();
    } else {
      focus();
    }
  }, [text]);

  const clear = () => {
    navigation.setParams({text: ''});
    inputRef.current.clear();
  };

  const search = () => dispatch(Actions.search(text));

  const focus = () => inputRef.current.focus();

  const ClearButton = () => (
    <TouchableOpacity onPress={clear}>
      <Icon name="close" color="#000" size={18} style={{paddingRight: 5}} />
    </TouchableOpacity>
  );

  return (
    <Container>
      <Input
        ref={inputRef}
        value={text}
        placeholder="Artistas, músicas ou playlists..."
        placeholderTextColor={'#343434'}
        onChangeText={setText}
        onSubmitEditing={search}
      />
      {!!text ? (
        <ClearButton />
      ) : (
        <Icon name="search" color="#000" size={18} style={{paddingRight: 5}} />
      )}
    </Container>
  );
};
