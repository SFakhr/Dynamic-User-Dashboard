import { Action, createReducer, on } from '@ngrx/store';

import { dataBusState } from '../state';

import { DataBusModel } from '../../models/store/databus';
import {
  getAllUsersFailed,
  getAllUsersSuccess,
  selectTableRowData,
} from '../actions';

const initialState = new DataBusModel() as dataBusState;

const dataBusReducer = createReducer(
  initialState,

  //////////// Users ////////////////////////////
  on(getAllUsersSuccess, (state, action) => {
    const _d = { ...state };
    _d.data.users.data = action.users;
    _d.data.users.total = action.total;
    _d.data.users.per_page = action.per_page;
    _d.data.users.total_pages = action.total_pages;

    return _d;
  }),
  on(getAllUsersFailed, (state) => {
    const _d = { ...state };
    _d.data.users.data = [];
    _d.data.users.total = 0;
    _d.data.users.per_page = 0;
    _d.data.users.total_pages = 0;

    return _d;
  }),
  ////////////////////////////////////////////////////////

  on(selectTableRowData, (state, action) => {
    const _d = { ...state };
    _d.selectedTableRow.node = action.node;
    _d.selectedTableRow.data = action.rowData;
    return _d;
  })
);

export default function reducer(
  state: dataBusState,
  action: Action
): dataBusState {
  return dataBusReducer(state, action);
}
