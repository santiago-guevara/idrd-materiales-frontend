import { TestBed } from '@angular/core/testing';

import { ProjectMaterialsService } from './project-materials.service';

describe('ProjectMaterialsService', () => {
  let service: ProjectMaterialsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectMaterialsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
