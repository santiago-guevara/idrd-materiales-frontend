import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  MaterialsService,
  Material,
} from '../../core/services/materials.service';

import {
  ProjectMaterialsService,
  ProjectMaterial,
} from '../../core/services/project-materials.service';

@Component({
  selector: 'app-project-materials',
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    FormsModule,
    CurrencyPipe,
  ],
  templateUrl: './project-materials.component.html',
  styleUrl: './project-materials.component.css',
})
export class ProjectMaterialsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly materialsService = inject(MaterialsService);
  private readonly projectMaterialsService =
    inject(ProjectMaterialsService);

  projectId!: number;

  materials: Material[] = [];
  assignedMaterials: ProjectMaterial[] = [];

  selectedMaterialId = 0;
  quantity = 1;

  displayedColumns = [
    'material',
    'unit',
    'quantity',
    'price',
    'total',
  ];

  ngOnInit(): void {
    this.projectId = Number(
      this.route.snapshot.paramMap.get('id'),
    );

    this.loadMaterials();
    this.loadAssignedMaterials();
  }

  loadMaterials(): void {
    this.materialsService.getAll().subscribe((materials) => {
      this.materials = materials;
    });
  }

  loadAssignedMaterials(): void {
    this.projectMaterialsService
      .getMaterials(this.projectId)
      .subscribe((materials) => {
        this.assignedMaterials = materials;
      });
  }

  assignMaterial(): void {
    if (
      !this.selectedMaterialId ||
      this.quantity <= 0
    ) {
      return;
    }

    this.projectMaterialsService
      .assignMaterial(this.projectId, {
        materialId: this.selectedMaterialId,
        quantity: this.quantity,
      })
      .subscribe(() => {
        this.selectedMaterialId = 0;
        this.quantity = 1;

        this.loadAssignedMaterials();
      });
  }

  calculateTotal(item: ProjectMaterial): number {
    return (
      Number(item.quantity) *
      Number(item.material.price)
    );
  }
}