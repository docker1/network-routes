import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutesListComponent } from './routes-list.component';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [RoutesListComponent],
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
  ],
})
export class RoutesListModule {}
