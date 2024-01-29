import { DataNode } from '@app/models/store/dataNode';
import { createAction, props } from '@ngrx/store';
import { types } from './types';
import { UserModel } from '@app/models/user';

// Users /////////////////////////////////////////////////////////////////////////////////////////////////

export const getAllUsers = createAction(types.GET_ALL_USERS_ATTEMPT);

export const getAllUsersSuccess = createAction(
  types.GET_ALL_USERS_SUCCESS,
  props<{
    users: UserModel[];
    total: number;
    per_page: number;
    total_pages: number;
  }>()
);

export const getAllUsersFailed = createAction(types.GET_ALL_USERS_FAILED);

//////////////////////////////////////////////////////////////////////////////////////////////////////

export const selectTableRowData = createAction(
  types.SELECT_TABLE_ROW_DATA,
  props<{ node: DataNode; rowData: {} }>()
);
