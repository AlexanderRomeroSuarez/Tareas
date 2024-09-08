import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTareasComponent } from './details-tareas.component';

describe('DetailsTareasComponent', () => {
  let component: DetailsTareasComponent;
  let fixture: ComponentFixture<DetailsTareasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsTareasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsTareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
