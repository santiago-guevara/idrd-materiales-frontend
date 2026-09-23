import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';

import {
  Project,
  ProjectsService,
} from '../../core/services/projects.service';

@Component({
  selector: 'app-project-list',
  imports: [
    MatTableModule,
    MatButtonModule,
  ],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css',
})
export class ProjectListComponent implements OnInit {
  private readonly projectsService = inject(ProjectsService);
  private readonly router = inject(Router);

  projects: Project[] = [];

  displayedColumns = [
    'name',
    'department',
    'city',
    'actions',
  ];

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectsService.getAll().subscribe((projects) => {
      this.projects = projects;
    });
  }

  createProject(): void {
    this.router.navigate(['/projects/new']);
  }

  editProject(id: number): void {
    this.router.navigate(['/projects/edit', id]);
  }

  manageMaterials(id: number): void {
  this.router.navigate([
    '/projects',
    id,
    'materials',
  ]);
}

  deleteProject(id: number): void {
    if (!confirm('¿Deseas eliminar este proyecto?')) {
      return;
    }

    this.projectsService.delete(id).subscribe(() => {
      this.projects = this.projects.filter(
        (project) => project.id !== id,
      );
    });
  }

  viewReport(id: number): void {
  this.router.navigate([
    '/projects',
    id,
    'report',
  ]);
}
}