import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ContentHeader } from '@app/config/content-header';
import { Router } from '@angular/router';

@Component({
  selector: 'app-content-header',
  templateUrl: './content-header.component.html',
  styleUrl: './content-header.component.scss',
})
export class ContentHeaderComponent {
  @Input() props: { title: string; isDetailView: boolean; node: string } = {
    title: 'Users List',
    isDetailView: false,
    node: 'users',
  };

  @Output() onModeClick = new EventEmitter<string>();
  @Output() onValueChanged = new EventEmitter<string>();

  headerConfig = ContentHeader;
  searchValue = '';
  mode = 'listView';

  constructor(private router: Router) {}

  onToggleViewClick(viewType: string): void {
    if (viewType === 'listView') {
      this.onModeClick.emit('listView');
      this.mode = 'listView';
    } else {
      this.mode = 'gridView';
      this.onModeClick.emit('gridView');
    }
  }

  onClickBAckBtn(): void {
    this.router.navigate(['/users']);
  }

  onSearchValueChange(value: string): void {
    this.onValueChanged.emit(value);
  }
}
