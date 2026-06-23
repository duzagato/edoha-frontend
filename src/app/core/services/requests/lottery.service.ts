import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiRoutes } from '../../../shared/constants/api-routes';
import { Lottery, CreateLotteryDTO, UpdateLotteryDTO } from '../../models/lottery';
import { InstitutionSession } from '../../models/session/institution-session';


@Injectable({ providedIn: 'root' })
export class LotteryService {
  constructor(private readonly http: HttpClient) {}

  
  getAll(): Observable<Lottery[]> {
    return this.http.get<Lottery[]>(`${environment.apiUrl}${ApiRoutes.LOTTERY_GET_ALL}`);
  }
  
  getById(id: string): Observable<Lottery> {
    const institutionSession = new InstitutionSession();
    const institutionId = institutionSession.id;
    const url = `${environment.apiUrl}${ApiRoutes.LOTTERY_GET_BY_ID.replace('{idInstitution}', institutionId!)}/${id}`;
    return this.http.get<Lottery>(url);
  }
  
  getLotteriesByInstitution(): Observable<Lottery[]> {
    const idInstitution = new InstitutionSession().id;
    const url = `${environment.apiUrl}${ApiRoutes.LOTTERY_GET_ALL.replace('{idInstitution}', idInstitution!)}`;
    return this.http.get<Lottery[]>(url);
  }
  
  create(idInstitution: string, dto: CreateLotteryDTO): Observable<void> {
    let url = `${environment.apiUrl}${ApiRoutes.LOTTERY_POST}`;
    url = url.replace('{idInstitution}', idInstitution);
    console.log(url);

    return this.http.post<void>(url, dto);
  }
  
  update(dto: UpdateLotteryDTO): Observable<void> {
    return this.http.put<void>(`${environment.apiUrl}${ApiRoutes.LOTTERY_PUT}`, dto);
  }
  
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}${ApiRoutes.LOTTERY_DELETE}/${id}`);
  }
}
