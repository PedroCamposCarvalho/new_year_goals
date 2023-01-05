import { Reducer } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import { GoalsState, GoalsTypes } from './types';

const INITIAL_STATE: GoalsState = {
  data: [],
  error: false,
  loading: false,
};

const reducer: Reducer<GoalsState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GoalsTypes.LOAD_GOALS:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload,
      };
    case GoalsTypes.CREATE_GOAL:
      AsyncStorage.setItem(
        'StoredGoals',
        JSON.stringify([...state.data, action.payload.data]),
      );
      return {
        ...state,
        loading: false,
        error: false,
        data: [...state.data, action.payload.data],
      };
    default:
      return state;
  }
};

export default reducer;
