import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list',
      },
      {
        path: 'list',
        loadChildren: () =>
          import('./modules/routes-list/routes-list.module').then(
            (m) => m.RoutesListModule
          ),
      },
      {
        path: 'new',
        loadChildren: () =>
          import('./modules/routes-creator/routes-creator.module').then(
            (m) => m.RoutesCreatorModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
