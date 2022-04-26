import { TestBed } from '@angular/core/testing';

import { NavigationParamService } from './navigation-param.service';

describe('NavigationParamService', () => {
  let service: NavigationParamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigationParamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
