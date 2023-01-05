import { TestBed } from '@angular/core/testing';

import { DetailsBillService } from './details-bill.service';

describe('DetailsBillService', () => {
  let service: DetailsBillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailsBillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
