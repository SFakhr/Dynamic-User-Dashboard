import { InjectionToken, NgModule } from '@angular/core';

// Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

// Store
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { combinedReducers } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { effects } from './store/effects';

// Components
import { UsersListComponent } from './pages/users-list/users-list.component';
import { UserComponent } from './forms/user/user.component';
import { AppComponent } from './app.component';

import { AppConfig } from '../environments/environment';
import { TableComponent } from './components/table/table.component';
import { ContentHeaderComponent } from './components/content-header/content-header.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const ReducerToken = new InjectionToken('Registered Reducer');
export function getReducers(): typeof combinedReducers {
  return combinedReducers;
}

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({
    keys: [
      {
        dataBus: ['selectedTableRow', 'data'],
      },
      'ui',
    ],
    rehydrate: true, //must be true in order for local storage to persist
  })(reducer);
}

let providerImport: any = {
  provide: LocationStrategy,
  useClass: HashLocationStrategy,
};

let devImports = [StoreDevtoolsModule.instrument({ maxAge: 15 })];

if (AppConfig['production']) {
  devImports = [];
}

providerImport = [];

const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    UserComponent,
    TableComponent,
    ContentHeaderComponent,
    UserCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    EffectsModule.forRoot(effects),
    StoreModule.forRoot(ReducerToken, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
      },
    }),
    devImports,
  ],
  providers: [
    [{ provide: ReducerToken, useFactory: getReducers }],
    providerImport,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
