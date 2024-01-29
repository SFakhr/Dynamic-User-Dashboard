import { setLoadingState } from '@app/store/actions/ui.actions';
import { AppConfig } from '../../environments/environment';
import { DataNode } from '@app/models/store/dataNode';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  appConfig: any = AppConfig;

  constructor(private http: HttpClient, private store: Store<any>) {}

  getApiCall(
    apiNode: DataNode,
    page: number = -1,
    id: number = -1
  ): Observable<any> {
    this.store.dispatch(
      setLoadingState({
        node: apiNode,
        isLoading: true,
      })
    );
    let apiParams = apiNode.toString();
    if (id >= 0) {
      apiParams = `${apiParams}/${id}`;
    }
    if (page >= 0) {
      apiParams = `${apiParams}?page=${page}`;
    }
    return this.http
      .get<any>(`${this.appConfig['API'].endPoint}/${apiParams}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .pipe(
        catchError(() => {
          return throwError(() =>
            this.store.dispatch(
              setLoadingState({
                node: apiNode,
                isLoading: false,
              })
            )
          );
        })
      );
  }

  getApiCallPromise(
    nodeApi: DataNode,
    page: number = -1,
    id: number = -1
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getApiCall(nodeApi, page, id).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          this.store.dispatch(
            setLoadingState({
              node: nodeApi,
              isLoading: false,
            })
          );
          reject(error);
        }
      );
    });
  }
}
