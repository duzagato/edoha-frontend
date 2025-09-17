import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Blank } from './blank';

describe('Blank', () => {
  let component: Blank;
  let fixture: ComponentFixture<Blank>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Blank]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Blank);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
