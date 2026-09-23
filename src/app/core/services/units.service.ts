import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

export interface Unit {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class UnitsService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = `${environment.apiUrl}/units`;

  getAll(): Observable<Unit[]> {
    return this.http.get<Unit[]>(this.apiUrl);
  }
}