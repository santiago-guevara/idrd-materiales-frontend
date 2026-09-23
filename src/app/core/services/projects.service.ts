import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

export interface Project {
  id: number;
  name: string;
  cityId: number;
  city: {
    id: number;
    name: string;
    department: {
      id: number;
      name: string;
    };
  };
}

export interface CreateProject {
  name: string;
  cityId: number;
}

export interface ProjectReportMaterial {
  code: string;
  description: string;
  unit: string;
  quantity: number;
  price: number;
  total: number;
}

export interface ProjectReport {
  project: {
    id: number;
    name: string;
    city: string;
    department: string;
  };
  materials: ProjectReportMaterial[];
  totalCost: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = `${environment.apiUrl}/projects`;

  getAll(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  getOne(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${id}`);
  }

  create(project: CreateProject): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, project);
  }

  update(
    id: number,
    project: CreateProject,
  ): Observable<Project> {
    return this.http.patch<Project>(
      `${this.apiUrl}/${id}`,
      project,
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getReport(id: number): Observable<ProjectReport> {
  return this.http.get<ProjectReport>(
    `${this.apiUrl}/${id}/report`,
  );
}
}