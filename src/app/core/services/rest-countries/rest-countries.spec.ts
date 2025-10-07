import { TestBed } from '@angular/core/testing';
import { CountriesService } from './rest-countries';

describe('RestCountries', () => {
  let service: CountriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
