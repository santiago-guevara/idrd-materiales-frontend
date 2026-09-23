import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

export interface Material {
  id: number;
  code: string;
  description: string;
  price: number;
  unitId: number;
  unit: {
    id: number;
    name: string;
  };
}

export interface CreateMaterial {
  code: string;
  description: string;
  price: number;
  unitId: number;
}

@Injectable({
  providedIn: 'root',
})
export class MaterialsService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = `${environment.apiUrl}/materials`;

  getAll(): Observable<Material[]> {
    return this.http.get<Material[]>(this.apiUrl);
  }

  create(material: CreateMaterial): Observable<Material> {
    return this.http.post<Material>(this.apiUrl, material);
  }

  delete(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`);
}

getOne(id: number): Observable<Material> {
  return this.http.get<Material>(`${this.apiUrl}/${id}`);
}

update(
  id: number,
  material: CreateMaterial,
): Observable<Material> {
  return this.http.patch<Material>(
    `${this.apiUrl}/${id}`,
    material,
  );
}
}