/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ActivePromosComponent } from './activePromos.component';

describe('ActivePromosComponent', () => {
  let component: ActivePromosComponent;
  let fixture: ComponentFixture<ActivePromosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivePromosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivePromosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
