/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ChiimeService } from './chiime.service';

describe('Service: Chiime', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChiimeService]
    });
  });

  it('should ...', inject([ChiimeService], (service: ChiimeService) => {
    expect(service).toBeTruthy();
  }));
});
