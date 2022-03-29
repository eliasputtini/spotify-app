import React from 'react';

import {SearchInput} from '../components/SearchInput';
import {SearchFilters} from '../components/SearchFilters';
import {SearchResultList} from '../components/SearchResultList';
import {Container} from './styles';

export const Home = ({navigation, route}) => {
  return (
    <Container>
      <SearchInput query={route.params?.query} />
      <SearchFilters />
      <SearchResultList />
    </Container>
  );
};
