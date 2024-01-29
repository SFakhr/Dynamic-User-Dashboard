import { Component, Input } from '@angular/core';
import { UserModel } from '@app/models/user';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  @Input() data: UserModel = new UserModel({});
}
