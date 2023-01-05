import { all, takeLatest } from 'redux-saga/effects';

import { GoalsTypes } from './repositories/types';

import { create, load } from './repositories/sagas';

export default function* rootSaga(): any {
  return yield all([
    takeLatest(GoalsTypes.LOAD_GOALS, load),
    takeLatest(GoalsTypes.CREATE_GOAL, create),
  ]);
}
