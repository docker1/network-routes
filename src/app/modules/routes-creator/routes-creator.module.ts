import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutesCreatorComponent } from './routes-creator.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [RoutesCreatorComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: RoutesCreatorComponent,
      },
    ]),
  ],
})
export class RoutesCreatorModule {}
