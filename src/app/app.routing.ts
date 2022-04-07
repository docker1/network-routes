import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './global/not-found/not-found.component';

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
  {
    path: '404',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: '404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
