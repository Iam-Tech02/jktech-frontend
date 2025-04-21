import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/core/services/blog.service';
import { ToastrService } from 'ngx-toastr';

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
    private router: Router,
    private toastr: ToastrService   // ✅ Inject Toastr service
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
      this.toastr.warning('Please fill out the form correctly.'); // ✅ Warn if invalid
      return;
    }

    this.isSubmitting = true;
    this.error = null;

    this.blogService.createBlog(this.postForm.value).subscribe({
      next: () => {
        this.toastr.success('Post created successfully!'); // ✅ Show success toast
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.error = error.message;
        this.toastr.error(this.error || 'Failed to create post.'); // ✅ Show error toast
        this.isSubmitting = false;
      }
    });
  }
}
