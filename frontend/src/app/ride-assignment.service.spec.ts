import { TestBed } from '@angular/core/testing';

import { RideAssignmentService } from './ride-assignment.service';

describe('RideAssignmentService', () => {
  let service: RideAssignmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RideAssignmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
