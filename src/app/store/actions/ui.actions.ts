import { DataNode } from '@app/models/store/dataNode';
import { createAction, props } from '@ngrx/store';
import { types } from './types';

export const setLoadingState = createAction(
  types.SET_LOADING_STATE,
  props<{ node: DataNode; isLoading: boolean }>()
);
