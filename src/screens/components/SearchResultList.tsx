import React, {useMemo} from 'react';
import {
  StyleSheet,
  Text,
  SectionList,
  View,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import * as Actions from '../../actions';
import {SearchResult} from './SearchResult';

export const SearchResultList = () => {
  const dispatch = useDispatch();
  const results = useSelector(state => state.results);
  const filters = useSelector(state => state.filters);

  // The results object has the shape of { albums: {...}, tracks: {...}, ...}
  const sections = //useMemo(() => {
    Object.entries(results)
      .filter(([category]) =>
        filters.some(filter => filter.category === category && filter.selected),
      )
      .map(([category, data]) => ({
        title: category,
        data: data.items,
        total: data.total,
        next: data.next,
      }));
  //}, [ results, filters ]);

  const loadMore = url => dispatch(Actions.loadMore(url));

  const ItemSeparator = () => <View style={styles.itemSeparator} />;

  const renderItem = ({item}) => <SearchResult {...item} />;

  const renderSectionFooter = ({section: {next}}) => {
    return (
      next && ( // If there are no more items to load next is null
        <TouchableOpacity
          style={styles.sectionFooter}
          onPress={() => loadMore(next)}>
          <Text style={styles.sectionFooterText}>{'Carregar mais'}</Text>
        </TouchableOpacity>
      )
    );
  };

  const getItemLayout = (item, index) => {
    const itemHeight = 100;
    return {length: itemHeight, offset: itemHeight * index, index};
  };

  // Make keys more specific because some item ids are duplicate between types
  const keyExtractor = (item, index) => item.type + '_' + index + '_' + item.id;

  return (
    <SectionList
      sections={sections}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      getItemLayout={getItemLayout}
      renderSectionFooter={renderSectionFooter}
      stickySectionHeadersEnabled={true}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    alignItems: 'center',
    backgroundColor: '#111111',
    flexDirection: 'row',
    height: 40,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  sectionHeaderText: {
    color: '#ababab',
    fontSize: 18,
    fontFamily: 'Montserrat-Medium',
  },
  sectionFooter: {
    alignItems: 'center',
    backgroundColor: '#111111',
    height: 40,
    justifyContent: 'center',
    marginBottom: 1,
    paddingHorizontal: 20,
  },
  sectionFooterText: {
    color: '#e6eaee',
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
  },
  itemSeparator: {
    height: 1,
    backgroundColor: '#111111',
  },
});
