import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRoute } from '../models/route.model';
import { map } from 'rxjs/operators';
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

  editRoute(route: IRoute, uuid: string): Observable<IRoutesResponse> {
    return this.http.put<IRoutesResponse>(
      `http://localhost:3333/api/routes/${uuid}`,
      route
    );
  }

  deleteRoute(uuid: string): Observable<IRoutesResponse> {
    return this.http.delete<IRoutesResponse>(
      `http://localhost:3333/api/routes/${uuid}`
    );
  }
}
