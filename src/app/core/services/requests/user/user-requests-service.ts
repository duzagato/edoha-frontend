import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { InsertUserRequest } from '../../../models/requests/user/insert-user-request';
import { ApiRoutes } from '../../../../shared/constants/api-routes';

@Injectable({
  providedIn: 'root'
})
export class UserRequestsService {
  constructor(private http: HttpClient) { }

  userPost(userData: InsertUserRequest): Observable<any> {
    const url = `${environment.apiUrl}${ApiRoutes.INSERT_USER}`;
    const response = this.http.post<any>(url, userData);

    return response;
  }
}
