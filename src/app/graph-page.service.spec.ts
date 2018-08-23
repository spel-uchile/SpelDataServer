import { TestBed, inject } from '@angular/core/testing';

import { GraphPageService } from './graph-page.service';

describe('GraphPageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GraphPageService]
    });
  });

  it('should be created', inject([GraphPageService], (service: GraphPageService) => {
    expect(service).toBeTruthy();
  }));
});
