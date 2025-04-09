import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {
  postForm!: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  get f() {
    return this.postForm.controls;
  }

  createPost() {
    if (this.postForm.invalid) {
      return;
    }

    const requestData = this.postForm.value;

    this.apiService.apiRequest('POST', 'posts/create', requestData).subscribe({
      next: (response) => {
        console.log('Post Created Successfully:', response);
        alert('Post Created Successfully!');
      },
      error: (error) => {
        console.error('Post Creation Failed:', error);
        alert('Post Creation Failed!');
      }
    });
  }
}
