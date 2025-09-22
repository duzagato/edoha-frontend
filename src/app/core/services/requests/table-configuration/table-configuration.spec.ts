import { TestBed } from '@angular/core/testing';

import { TableConfiguration } from './table-configuration';

describe('TableConfiguration', () => {
  let service: TableConfiguration;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableConfiguration);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
