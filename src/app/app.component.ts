import { getAllUsers } from './store/actions';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private store: Store) {
    setTimeout(() => {
      this.store.dispatch(getAllUsers());
    }, 500);
  }
}
