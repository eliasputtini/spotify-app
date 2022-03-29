import {call, put, select, debounce, takeLatest} from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Api from '../api';
import * as Actions from '../actions';

const SEARCH_DEBOUNCE_MS = 500;

function* getToken() {
  try {
    let tokenJson = yield call(AsyncStorage.getItem, 'access-token');
    let tokenExpireDate = yield call(AsyncStorage.getItem, 'token-expires');
    let tokenCreationDate = yield call(AsyncStorage.getItem, 'token-created');
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    today.toISOString();
    if (!tokenJson || today - tokenCreationDate >= tokenExpireDate) {
      let token = yield call(Api.getToken);
      tokenJson = JSON.stringify(token);
      yield call(AsyncStorage.setItem, 'access-token', tokenJson);
    }
    return tokenJson;
  } catch (error) {
    console.log(error);
  }
}

function* search({query}) {
  try {
    const token = yield call(getToken);
    const filters = yield select(state => state.filters);
    const type = filters
      .filter(filter => filter.selected)
      .map(filter => filter.type)
      .join(',');
    const results = yield call(Api.search, `Bearer ${token}`, query, type);
    yield put(Actions.results(results, true));
  } catch (error) {
    console.log(error);
  }
}

function* loadMore({url}) {
  try {
    const token = yield call(getToken);
    const results = yield call(Api.loadMore, `Bearer ${token}`, url);
    yield put(Actions.results(results));
  } catch (error) {
    console.log(error);
  }
}

function* getDetails({url}) {
  try {
    const token = yield call(getToken);
    const details = yield call(Api.getDetails, `Bearer ${token}`, url);
    yield put(Actions.details(details));
  } catch (error) {
    console.log(error);
  }
}

function* toggleFilter({selected}) {
  const query = yield select(state => state.query);
  if (selected && query) {
    yield put(Actions.search(query));
  }
}

export function* rootSaga() {
  yield debounce(SEARCH_DEBOUNCE_MS, Actions.SEARCH, search);
  yield takeLatest(Actions.GET_DETAILS, getDetails);
  yield takeLatest(Actions.LOAD_MORE, loadMore);
  yield takeLatest(Actions.TOGGLE_FILTER, toggleFilter);
}
