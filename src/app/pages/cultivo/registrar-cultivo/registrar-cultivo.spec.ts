import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarCultivo } from './registrar-cultivo';

describe('RegistrarCultivo', () => {
  let component: RegistrarCultivo;
  let fixture: ComponentFixture<RegistrarCultivo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarCultivo],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrarCultivo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
