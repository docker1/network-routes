import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutesListComponent } from './routes-list.component';
import { RouterModule } from '@angular/router';

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
  ],
})
export class RoutesListModule {}
