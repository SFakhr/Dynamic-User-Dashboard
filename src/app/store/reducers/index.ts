import dataBusReducer from './dataBus.reducer';
import uiReducer from './ui.reducer';

export const combinedReducers = {
  dataBus: dataBusReducer,
  ui: uiReducer,
};
