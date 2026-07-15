import { TestBed } from '@angular/core/testing';

import { Agentes } from './agentes';

describe('Agentes', () => {
  let service: Agentes;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Agentes);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
