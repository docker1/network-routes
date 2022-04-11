import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, EMPTY, Subscription, throwError } from 'rxjs';
import { catchError, first, switchMap, tap } from 'rxjs/operators';
import { IRoute } from 'src/app/models/route.model';
import { RoutesRequestService } from 'src/app/services/routes-request.service';
import { RouteFormComponent } from '../routes-creator/components/route-form/route-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouteDialogResult } from 'src/app/models/route-dialog-result.enum';
import { IRoutesResponse } from 'src/app/models/routes-response.model';

@Component({
  selector: 'app-routes-list',
  templateUrl: './routes-list.component.html',
  styleUrls: ['./routes-list.component.scss'],
})
export class RoutesListComponent implements OnInit {
  routes$ = new BehaviorSubject<IRoute[]>([]);
  sortedRoutes$ = new BehaviorSubject<IRoute[]>([]);
  columns: string[] = ['address', 'gateway', 'interface'];

  constructor(
    private routesRequestService: RoutesRequestService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getRoutes();
  }

  private getRoutes(): void {
    this.routesRequestService
      .getAllRoutes()
      .pipe(
        first(),
        tap((routes) => {
          this.routes$.next(routes);
          this.sortedRoutes$.next(routes);
        })
      )
      .subscribe();
  }

  sortData(sort: Sort): void {
    const data = [...this.routes$.value];
    if (!sort.active || sort.direction === '') {
      this.sortedRoutes$.next(data);
      return;
    }
    const sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'address':
          if (a.address === b.address) {
            return this.compareIPs(a.mask, b.mask, isAsc);
          }
          return this.compareIPs(a.address, b.address, isAsc);
        case 'gateway':
          return this.compareIPs(a.gateway, b.gateway, isAsc);
        case 'interface':
          return this.compare(a.interface, b.interface, isAsc);
        default:
          return 0;
      }
    });
    this.sortedRoutes$.next(sortedData);
  }

  onRowClick(route: IRoute): void {
    this.dialog
      .open(RouteFormComponent, {
        data: { destination: 'edit', route },
        width: '800px',
        height: '600px',
      })
      .afterClosed()
      .pipe(
        first(),
        switchMap(
          (dialogResult: { result: RouteDialogResult; data: IRoute }) => {
            switch (dialogResult?.result) {
              case RouteDialogResult.Edit:
                return this.routesRequestService.editRoute(
                  dialogResult.data,
                  <string>route.uuid
                );
              case RouteDialogResult.Remove: {
                return this.routesRequestService.deleteRoute(
                  <string>route.uuid
                );
              }
              default:
                return EMPTY;
            }
          }
        ),
        catchError((err) => {
          this.openSnackBar(err.message);
          return throwError(err);
        }),
        tap((response: IRoutesResponse) => {
          this.openSnackBar(response.message);
          this.getRoutes();
        })
      )
      .subscribe();
  }

  private compare(
    a: string | number,
    b: string | number,
    isAsc: boolean
  ): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  private compareIPs(a: string, b: string, isAsc: boolean): number {
    const aParts = a.split('.');
    const bParts = b.split('.');

    for (let i = 0; i < aParts.length; i++) {
      if (aParts[i] !== bParts[i]) {
        return this.compare(parseInt(aParts[i]), parseInt(bParts[i]), isAsc);
      }
    }

    return 0;
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, undefined, { duration: 3000 });
  }
}
