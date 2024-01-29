import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import { DataNode } from '@app/models/store/dataNode';
import { setLoadingState, types } from '../actions';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

@Injectable()
export class DataBusEffects {
  getAllUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(types.GET_ALL_USERS_ATTEMPT),
      mergeMap(() =>
        this.api.getApiCall(DataNode.users).pipe(
          map((response) => {
            this.store.dispatch(
              setLoadingState({
                node: DataNode.users,
                isLoading: false,
              })
            );
            return {
              type: types.GET_ALL_USERS_SUCCESS,
              users: response.data || [],
              page: response.page,
              total: response.total,
              per_page: response.per_page,
              total_pages: response.total_pages,
            };
          }),
          catchError(() => {
            this.store.dispatch(
              setLoadingState({
                node: DataNode.users,
                isLoading: false,
              })
            );
            return of({
              type: types.GET_ALL_USERS_FAILED,
            });
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private api: ApiService
  ) {}
}
