import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gerenciar } from './gerenciar';

describe('Gerenciar', () => {
  let component: Gerenciar;
  let fixture: ComponentFixture<Gerenciar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Gerenciar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Gerenciar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
