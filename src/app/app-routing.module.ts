import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

// Components
import { UsersListComponent } from './pages/users-list/users-list.component';
import { UserComponent } from './forms/user/user.component';

const routes: Routes = [
  {
    path: 'users',
    pathMatch: 'full',
    component: UsersListComponent,
  },
  {
    path: 'users/:id',
    pathMatch: 'full',
    component: UserComponent,
  },
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: '**', redirectTo: 'users', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
