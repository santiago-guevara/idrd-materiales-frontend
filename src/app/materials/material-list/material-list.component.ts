import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import {
  MaterialsService,
  Material,
} from '../../core/services/materials.service';

@Component({
  selector: 'app-material-list',
  imports: [MatTableModule, CurrencyPipe, MatButtonModule],
  templateUrl: './material-list.component.html',
  styleUrl: './material-list.component.css',
})
export class MaterialListComponent implements OnInit {
  private readonly materialsService = inject(MaterialsService);
  private readonly router = inject(Router);

  materials: Material[] = [];

  displayedColumns: string[] = [
    'code',
    'description',
    'unit',
    'price',
    'actions',
  ];

  ngOnInit(): void {
    this.materialsService.getAll().subscribe((materials) => {
      this.materials = materials;
    });
  }

    goToCreate(): void {
    this.router.navigate(['/materials/new']);
  }

    editMaterial(id: number): void {
    this.router.navigate(['/materials/edit', id]);
  }

deleteMaterial(id: number): void {
  if (!confirm('¿Deseas eliminar este material?')) {
    return;
  }

  this.materialsService.delete(id).subscribe(() => {
    this.materials = this.materials.filter(
      (material) => material.id !== id,
    );
  });
}
}