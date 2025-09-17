import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Default } from './default';

describe('Default', () => {
  let component: Default;
  let fixture: ComponentFixture<Default>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Default]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Default);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
