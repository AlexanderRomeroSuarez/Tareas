import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse } from './base-interface';
import { IRequestLogin } from './user-api-interface';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  private apiUrl = 'https://localhost:44312/api/Tareas'; 

  _httpClient = inject(HttpClient)

  createConcert(event: IRequestLogin): Observable<IResponse<number>> {
		return this._httpClient.post<IResponse<number>>(this.apiUrl, event);
	}

}
