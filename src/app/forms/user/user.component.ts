import { OnDestroy, Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '@app/services/api.service';
import { DataNode } from '@app/models/store/dataNode';
import { setLoadingState } from '@app/store/actions';
import { selectDataBus } from '@app/store/selectors';
import { UserModel } from '@app/models/user';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit, OnDestroy {
  @Input() rowData: UserModel;

  dataBusSubscription$: Subscription;
  validationForm: FormGroup;
  formData: UserModel;
  data: UserModel;
  userID: string;
  node: string;

  constructor(
    private apiService: ApiService,
    private store: Store<any>,
    private fb: FormBuilder,
    private router: Router
  ) {
    const routerSplit = router.routerState.snapshot.url.split('/');
    this.userID = routerSplit[routerSplit.length - 1];
  }

  ngOnInit(): void {
    this.validationForm = this.fb.group({
      id: [''],
      first_name: [''],
      last_name: [''],
      email: [''],
      avatar: [null],
    });

    this.dataBusSubscription$ = this.store
      .select(selectDataBus)
      .subscribe((dataBusItem) => {
        this.data = dataBusItem.selectedTableRow.data;
        this.node = dataBusItem.selectedTableRow.node;

        if (this.data && this.node === 'users' && this.data.id == this.userID) {
          this.formData = this.data;
          this.onInitializeView();
        } else {
          this.apiService
            .getApiCallPromise(DataNode.users, undefined, parseInt(this.userID))
            .then((user) => {
              this.formData = user.data;
              this.onInitializeView();

              this.store.dispatch(
                setLoadingState({
                  node: DataNode.users,
                  isLoading: false,
                })
              );
            })
            .catch(() => {
              this.store.dispatch(
                setLoadingState({
                  node: DataNode.users,
                  isLoading: false,
                })
              );

              this.router.navigate(['/users']);
            });
        }
      });
  }

  ngOnDestroy(): void {
    this.dataBusSubscription$?.unsubscribe();
  }

  onInitializeView(): void {
    if (Object.keys(this.formData).length > 0) {
      this.validationForm.patchValue({
        id: this.formData.id,
        first_name: this.formData.first_name,
        last_name: this.formData.last_name,
        email: this.formData.email,
        avatar: this.formData.avatar,
      });
    }
  }
}
