/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AdverticementsService } from './adverticements.service';

describe('Service: Adverticements', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdverticementsService]
    });
  });

  it('should ...', inject([AdverticementsService], (service: AdverticementsService) => {
    expect(service).toBeTruthy();
  }));
});