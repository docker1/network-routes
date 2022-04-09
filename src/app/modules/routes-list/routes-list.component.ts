import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IRoute } from 'src/app/models/route.model';
import { RoutesRequestService } from 'src/app/services/routes-request.service';

@Component({
  selector: 'app-routes-list',
  templateUrl: './routes-list.component.html',
  styleUrls: ['./routes-list.component.scss'],
})
export class RoutesListComponent implements OnInit {
  routes$!: Observable<IRoute[]>;
  columns: string[] = ['address', 'gateway', 'interface'];

  constructor(private routesRequestService: RoutesRequestService) {}

  ngOnInit(): void {
    this.routes$ = this.routesRequestService.getAllRoutes().pipe(
      tap((routes) => {
        routes.forEach((route) => {
          const mask = route.mask.split('.').reduce((prev, current) => {
            return prev + ((+current).toString(2).match(/1/g) || []).length;
          }, 0);
          route.address = `${route.address}/${mask}`;
        });
      })
    );
  }
}
