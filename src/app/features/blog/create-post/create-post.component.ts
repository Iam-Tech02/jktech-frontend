import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/core/services/blog.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {
  postForm!: FormGroup;
  isSubmitting = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder, 
    private blogService: BlogService,
    private router: Router
  ) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      brief: ['', [Validators.required, Validators.minLength(10)]],
      about: ['']
    });
  }

  get f() {
    return this.postForm.controls;
  }

  createPost() {
    if (this.postForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.error = null;

    this.blogService.createBlog(this.postForm.value).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.error = error.message;
        this.isSubmitting = false;
      }
    });
  }
}
