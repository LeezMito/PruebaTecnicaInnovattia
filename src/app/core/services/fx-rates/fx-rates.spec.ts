import { TestBed } from '@angular/core/testing';

import { FxRates } from './fx-rates';

describe('FxRates', () => {
  let service: FxRates;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FxRates);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
