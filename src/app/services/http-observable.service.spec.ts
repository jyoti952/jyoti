import { TestBed } from '@angular/core/testing';

import { HttpObservableService } from './http-observable.service';

describe('HttpObservableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpObservableService = TestBed.get(HttpObservableService);
    expect(service).toBeTruthy();
  });
});
