/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PendingAdComponent } from './pendingAd.component';

describe('PendingAdComponent', () => {
  let component: PendingAdComponent;
  let fixture: ComponentFixture<PendingAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
