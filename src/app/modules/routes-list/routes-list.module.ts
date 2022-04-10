import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutesListComponent } from './routes-list.component';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { IpWithShortenMaskPipe } from './pipes/ip-with-shorten-mask.pipe';

@NgModule({
  declarations: [RoutesListComponent, IpWithShortenMaskPipe],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: RoutesListComponent,
      },
    ]),
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatSnackBarModule,
    ReactiveFormsModule,
  ],
})
export class RoutesListModule {}
