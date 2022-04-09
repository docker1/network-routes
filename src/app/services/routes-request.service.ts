import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IRoute } from '../models/route.model';
import { map, tap } from 'rxjs/operators';
import { IRoutesResponse } from '../models/routes-response.model';

@Injectable({
  providedIn: 'root',
})
export class RoutesRequestService {
  constructor(private http: HttpClient) {}

  getAllRoutes(): Observable<IRoute[]> {
    return this.http
      .get<IRoutesResponse>('http://localhost:3333/api/routes')
      .pipe(
        map((response: IRoutesResponse) => <IRoute[]>response.payload.routes)
      );
  }

  saveRoute(route: IRoute): Observable<IRoutesResponse> {
    return this.http.post<IRoutesResponse>(
      'http://localhost:3333/api/routes',
      route
    );
  }
}
