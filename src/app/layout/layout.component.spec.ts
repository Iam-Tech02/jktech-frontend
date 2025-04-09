import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from '../shared/components/header/header.component'; 
import { SidebarComponent } from '../shared/components/sidebar/sidebar.component'; // ✅ Import SidebarComponent
import { RouterTestingModule } from '@angular/router/testing'; // ✅ Import RouterTestingModule
import { ReactiveFormsModule } from '@angular/forms';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutComponent, HeaderComponent, SidebarComponent ], // ✅ Add SidebarComponent
      imports: [ RouterTestingModule,ReactiveFormsModule ] // ✅ Add RouterTestingModule

    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
