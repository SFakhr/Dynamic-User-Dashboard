import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

const materialModules = [
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  FormsModule,

  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatTableModule,
  MatIconModule,
  MatCardModule,
];

@NgModule({
  declarations: [],
  imports: [materialModules],
  exports: [materialModules],
  providers: [],
})
export class MaterialModule {}
