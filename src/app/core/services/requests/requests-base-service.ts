import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestsBaseService {
  pushResultInCache(requestUrl: string, result: any): void{
    const createdAt: Date = new Date();

    const cacheValue = {
      createdAt: createdAt.toISOString(), // Converte a data para uma string ISO 8601
      result: result
    };

    const cacheString = JSON.stringify(cacheValue);
    localStorage.setItem(requestUrl, cacheString);
  }

  getRequestResultFromCache(requestUrl: string): any{
    const cacheString = localStorage.getItem(requestUrl);

    if(cacheString) {
      const cacheValue = JSON.parse(cacheString);
      console.log(cacheValue);

      return cacheValue;
    }else{
      console.log('Nenhum dado encontrado no cache.');
      return null;
    }
  }
}
