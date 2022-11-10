import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutsItemComponent } from './produts-item.component';

describe('ProdutsItemComponent', () => {
  let component: ProdutsItemComponent;
  let fixture: ComponentFixture<ProdutsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutsItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdutsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
