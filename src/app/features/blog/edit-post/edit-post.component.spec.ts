import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditPostComponent } from './edit-post.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from 'src/app/core/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('EditPostComponent', () => {
  let component: EditPostComponent;
  let fixture: ComponentFixture<EditPostComponent>;
  let apiService: ApiService;

  // Mocked ActivatedRoute and ApiService
  const mockActivatedRoute = {
    paramMap: of({ get: (key: string) => key === 'id' ? '1' : null })
  };

  const mockApiService = {
    apiRequest: jasmine.createSpy('apiRequest').and.returnValue(of({ title: 'Test Post', description: 'This is a test post description' }))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      declarations: [ EditPostComponent ],
      providers: [
        FormBuilder,
        { provide: ApiService, useValue: mockApiService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditPostComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);

    fixture.detectChanges(); // Trigger change detection
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load post data on init', (done) => {
    // Trigger ngOnInit to ensure that the subscription happens
    component.ngOnInit();

    // Use fixture.whenStable to wait for async operations to complete
    fixture.whenStable().then(() => {
      // Check that the API request for fetching post data was made
      expect(apiService.apiRequest).toHaveBeenCalledWith('GET', 'posts/1');
      
      // Check if the form is patched correctly
      expect(component.postForm.value).toEqual({
        title: 'Test Post',
        description: 'This is a test post description'
      });

      done(); // Indicate that the test has completed
    });
  });
});
