import { TestBed } from '@angular/core/testing';

import { NsJsUtilsService } from './ns-js-utils.service';

describe('NsJsUtilsService', () => {
  let service: NsJsUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NsJsUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
