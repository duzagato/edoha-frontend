import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiRoutes } from '../../../shared/constants/api-routes';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient){}

  authPost(nickname: string, password: string){
    return this.http.post<{ token: string }>(`${environment.apiUrl + ApiRoutes.AUTH_POST}`, { nickname, password });
  }
}
