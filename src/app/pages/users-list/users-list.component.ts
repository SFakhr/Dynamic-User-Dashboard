import { selectDataBus, selectUI } from '@app/store/selectors';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataNode } from '@app/models/store/dataNode';
import { ApiService } from '@app/services/api.service';
import { UserModel } from '@app/models/user';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
  getAllUsersSuccess,
  selectTableRowData,
  setLoadingState,
} from '@app/store/actions';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit, OnDestroy {
  dataBusSubscription$: Subscription;
  searchTimeout: NodeJS.Timeout;
  mode: string = 'listView';
  pageIndex: number = 0;
  uiSubscription$: any;
  totalPerPage: number;
  totalPages: number;
  isLoading = false;
  data: UserModel[];
  total: number;

  constructor(
    private apiService: ApiService,
    private store: Store<any>,
    private router: Router
  ) {}

  ngOnInit(): void {
    const dataBusSelector = this.store.select(selectDataBus);
    this.dataBusSubscription$ = dataBusSelector.subscribe((dataBusItem) => {
      this.data = dataBusItem.data.users.data;
      this.totalPages = dataBusItem.data.users.total_pages;
      this.total = dataBusItem.data.users.total;
      this.totalPerPage = dataBusItem.data.users.per_page;
    });

    const uiSelector = this.store.select(selectUI);
    this.uiSubscription$ = uiSelector.subscribe((uiItem) => {
      this.isLoading = uiItem.loader?.users?.isLoading;
    });
  }

  ngOnDestroy(): void {
    this.dataBusSubscription$?.unsubscribe();
  }

  onModeClick(mode: string) {
    this.mode = mode;
  }

  onRecordClick(data: UserModel): void {
    this.store.dispatch(
      selectTableRowData({ node: DataNode.users, rowData: data })
    );
    this.router.navigate([`/users/${data.id}`]);
  }

  onSearchChange(userID: string): void {
    clearTimeout(this.searchTimeout);

    this.searchTimeout = setTimeout(() => {
      if (parseInt(userID)) {
        this.apiService
          .getApiCallPromise(DataNode.users, undefined, parseInt(userID))
          .then((user) => {
            this.data = [user.data];

            this.store.dispatch(
              setLoadingState({
                node: DataNode.users,
                isLoading: false,
              })
            );
          })
          .catch(() => {
            this.data = [];
          });
      } else {
        if (userID) {
          this.store.dispatch(
            getAllUsersSuccess({
              users: [],
              total: 0,
              per_page: 6,
              total_pages: 0,
            })
          );
        } else {
          this.onChangePage(0);
        }
      }
    }, 1500);
  }

  onChangePage(pageIndex: number): void {
    if (this.data.length - 1 / (pageIndex + 1) < this.totalPerPage) {
      if (this.pageIndex + 1 < pageIndex) {
        this.pageIndex += 1;
      }

      this.pageIndex = this.pageIndex + 1;
      this.apiService
        .getApiCallPromise(DataNode.users, pageIndex + 1)
        .then((users) => {
          this.store.dispatch(
            getAllUsersSuccess({
              users: this.data.concat(users.data),
              total: users.total,
              per_page: users.per_page,
              total_pages: users.total_pages,
            })
          );

          setTimeout(() => {
            this.store.dispatch(
              setLoadingState({
                node: DataNode.users,
                isLoading: false,
              })
            );
          }, 500);
        })
        .catch(() => {
          this.ngOnInit();
        });
    }
  }

  onLoadMore(): void {
    this.pageIndex = this.pageIndex + 1;

    this.onChangePage(this.pageIndex);
  }
}
