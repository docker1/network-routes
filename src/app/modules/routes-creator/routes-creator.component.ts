import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { throwError } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';
import { IRoute } from 'src/app/models/route.model';
import { RoutesRequestService } from 'src/app/services/routes-request.service';

@Component({
  selector: 'app-routes-creator',
  templateUrl: './routes-creator.component.html',
  styleUrls: ['./routes-creator.component.scss'],
})
export class RoutesCreatorComponent {
  constructor(
    private routesRequestService: RoutesRequestService,
    private snackBar: MatSnackBar
  ) {}

  onSubmit(route: IRoute) {
    this.routesRequestService
      .saveRoute(route)
      .pipe(
        first(),
        catchError((err) => {
          this.openSnackBar(err.message);
          return throwError(err);
        }),
        tap((response) => {
          this.openSnackBar(response.message);
        })
      )
      .subscribe();
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, undefined, { duration: 3000 });
  }
}
