import { TestBed } from '@angular/core/testing';

import { RequestsBaseService } from './requests-base-service';

describe('RequestsBaseService', () => {
  let service: RequestsBaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestsBaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
