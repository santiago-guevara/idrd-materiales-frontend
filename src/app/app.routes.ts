import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { MaterialListComponent } from './materials/material-list/material-list.component';
import { MaterialFormComponent } from './materials/material-form/material-form.component';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { ProjectFormComponent } from './projects/project-form/project-form.component';
import { ProjectMaterialsComponent } from './projects/project-materials/project-materials.component';
import { ProjectReportComponent } from './projects/project-report/project-report.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'materials',
        pathMatch: 'full',
      },
      {
        path: 'materials',
        component: MaterialListComponent,
      },
      {
        path: 'materials/new',
        component: MaterialFormComponent,
      },
      {
        path: 'materials/edit/:id',
        component: MaterialFormComponent,
      },
      {
        path: 'projects',
        component: ProjectListComponent,
      },
      {
        path: 'projects/new',
        component: ProjectFormComponent,
      },
      {
        path: 'projects/edit/:id',
        component: ProjectFormComponent,
      },
      {
        path: 'projects/:id/materials',
        component: ProjectMaterialsComponent,
      },
      {
        path: 'projects/:id/report',
        component: ProjectReportComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'materials',
  },
];