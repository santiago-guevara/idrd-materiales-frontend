import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

export interface City {
  id: number;
  name: string;
  departmentId: number;
}

@Injectable({
  providedIn: 'root',
})
export class CitiesService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    `${environment.apiUrl}/cities`;

  getByDepartment(
    departmentId: number,
  ): Observable<City[]> {
    return this.http.get<City[]>(
      `${this.apiUrl}?departmentId=${departmentId}`,
    );
  }
}