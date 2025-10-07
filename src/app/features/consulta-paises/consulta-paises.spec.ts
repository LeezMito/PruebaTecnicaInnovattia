import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaPaises } from './consulta-paises';

describe('ConsultaPaises', () => {
  let component: ConsultaPaises;
  let fixture: ComponentFixture<ConsultaPaises>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaPaises]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaPaises);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
