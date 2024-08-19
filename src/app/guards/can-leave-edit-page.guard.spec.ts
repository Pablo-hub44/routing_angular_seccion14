import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { canLeaveEditPageGuard } from './can-leave-edit-page.guard';

describe('canLeaveEditPageGuard', () => {
  const executeGuard: CanDeactivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => canLeaveEditPageGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
