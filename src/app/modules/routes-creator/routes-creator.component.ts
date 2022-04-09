import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IRoute } from 'src/app/models/route.model';
import { IRoutesResponse } from 'src/app/models/routes-response.model';
import { RoutesRequestService } from 'src/app/services/routes-request.service';

@Component({
  selector: 'app-routes-creator',
  templateUrl: './routes-creator.component.html',
  styleUrls: ['./routes-creator.component.scss'],
})
export class RoutesCreatorComponent {
  response$!: Observable<IRoutesResponse>;

  constructor(private routesRequestService: RoutesRequestService) {}

  onSubmit(route: IRoute) {
    this.response$ = this.routesRequestService.saveRoute(route);
  }
}
