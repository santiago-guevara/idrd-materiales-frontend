import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

import {
  ProjectReport,
  ProjectsService,
} from '../../core/services/projects.service';

@Component({
  selector: 'app-project-report',
  imports: [
    CurrencyPipe,
    MatButtonModule,
    MatTableModule,
  ],
  templateUrl: './project-report.component.html',
  styleUrl: './project-report.component.css',
})
export class ProjectReportComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly projectsService = inject(ProjectsService);

  report: ProjectReport | null = null;

  displayedColumns = [
    'code',
    'description',
    'unit',
    'quantity',
    'price',
    'total',
  ];

  ngOnInit(): void {
    const id = Number(
      this.route.snapshot.paramMap.get('id'),
    );

    this.projectsService.getReport(id).subscribe((report) => {
      this.report = report;
    });
  }
}