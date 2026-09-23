import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';

import {
  MaterialsService,
  CreateMaterial,
} from '../../core/services/materials.service';

import {
  UnitsService,
  Unit,
} from '../../core/services/units.service';

@Component({
  selector: 'app-material-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './material-form.component.html',
  styleUrl: './material-form.component.css',
})
export class MaterialFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly materialsService = inject(MaterialsService);
  private readonly unitsService = inject(UnitsService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  materialId: number | null = null;

  units: Unit[] = [];

  materialForm = this.fb.nonNullable.group({
    code: ['', Validators.required],
    description: ['', Validators.required],
    unitId: [0, [Validators.required, Validators.min(1)]],
    price: [0, [Validators.required, Validators.min(0.01)]],
  });

ngOnInit(): void {
  this.unitsService.getAll().subscribe((units) => {
    this.units = units;
  });

  const id = this.route.snapshot.paramMap.get('id');

  if (id) {
    this.materialId = Number(id);

    this.materialsService.getOne(this.materialId).subscribe((material) => {
      this.materialForm.patchValue({
        code: material.code,
        description: material.description,
        unitId: material.unitId,
        price: material.price,
      });
    });
  }
}

onSubmit(): void {
  if (this.materialForm.invalid) {
    this.materialForm.markAllAsTouched();
    return;
  }

  const material = this.materialForm.getRawValue();

  if (this.materialId) {
    this.materialsService
      .update(this.materialId, material)
      .subscribe(() => {
        this.router.navigate(['/materials']);
      });

    return;
  }

  this.materialsService.create(material).subscribe(() => {
    this.router.navigate(['/materials']);
  });
}
}