import { IRoute } from './route.model';

export interface IRoutesResponse {
  message: string;
  code: string;
  successful: boolean;
  payload: {
    routes: IRoute[];
  };
}
