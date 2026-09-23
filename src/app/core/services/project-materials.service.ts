import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

export interface ProjectMaterial {
  projectId: number;
  materialId: number;
  quantity: number;

  material: {
    id: number;
    code: string;
    description: string;
    price: number;
    unit: {
      id: number;
      name: string;
    };
  };
}

export interface AssignMaterial {
  materialId: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProjectMaterialsService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = `${environment.apiUrl}/projects`;

  getMaterials(
    projectId: number,
  ): Observable<ProjectMaterial[]> {
    return this.http.get<ProjectMaterial[]>(
      `${this.apiUrl}/${projectId}/materials`,
    );
  }

  assignMaterial(
    projectId: number,
    data: AssignMaterial,
  ): Observable<ProjectMaterial> {
    return this.http.post<ProjectMaterial>(
      `${this.apiUrl}/${projectId}/materials`,
      data,
    );
  }
}