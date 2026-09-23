import { Component, OnInit, inject } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators,} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import {
  ProjectsService,
  CreateProject,
} from '../../core/services/projects.service';

import {
  DepartmentsService,
  Department,
} from '../../core/services/departments.service';

import {
  CitiesService,
  City,
} from '../../core/services/cities.service';

@Component({
  selector: 'app-project-form',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.css',
})
export class ProjectFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly projectsService = inject(ProjectsService);
  private readonly departmentsService =
    inject(DepartmentsService);
  private readonly citiesService = inject(CitiesService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  departments: Department[] = [];
  cities: City[] = [];

  projectId: number | null = null;

  projectForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    departmentId: [
      0,
      [Validators.required, Validators.min(1)],
    ],
    cityId: [
      0,
      [Validators.required, Validators.min(1)],
    ],
  });

  ngOnInit(): void {
    this.loadDepartments();

    this.projectForm.controls.departmentId.valueChanges
      .subscribe((departmentId) => {
        this.loadCities(departmentId);
      });

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.projectId = Number(id);
      this.loadProject(this.projectId);
    }
  }

  loadDepartments(): void {
    this.departmentsService.getAll().subscribe(
      (departments) => {
        this.departments = departments;
      },
    );
  }

  loadCities(departmentId: number): void {
    if (!departmentId) {
      this.cities = [];
      this.projectForm.controls.cityId.setValue(0);
      return;
    }

    this.citiesService
      .getByDepartment(departmentId)
      .subscribe((cities) => {
        this.cities = cities;

        this.projectForm.controls.cityId.setValue(0);
      });
  }

  loadProject(id: number): void {
    this.projectsService.getOne(id).subscribe((project) => {

      const departmentId = project.city.department.id;

      this.projectForm.patchValue({
        name: project.name,
        departmentId,
      });

      this.citiesService
        .getByDepartment(departmentId)
        .subscribe((cities) => {
          this.cities = cities;

          this.projectForm.patchValue({
            cityId: project.cityId,
          });
        });
    });
  }

  onSubmit(): void {
    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      return;
    }

    const project: CreateProject =
      this.projectForm.getRawValue();

    if (this.projectId) {
      this.projectsService
        .update(this.projectId, {
          name: project.name,
          cityId: project.cityId,
        })
        .subscribe(() => {
          this.router.navigate(['/projects']);
        });

      return;
    }

    this.projectsService
      .create({
        name: project.name,
        cityId: project.cityId,
      })
      .subscribe(() => {
        this.router.navigate(['/projects']);
      });
  }
}