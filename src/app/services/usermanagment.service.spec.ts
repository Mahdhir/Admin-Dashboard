import { TestBed } from '@angular/core/testing';

import { UsermanagmentService } from './usermanagment.service';

describe('UsermanagmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsermanagmentService = TestBed.get(UsermanagmentService);
    expect(service).toBeTruthy();
  });
});
