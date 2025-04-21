import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BlogService } from "src/app/core/services/blog.service";
import { ToastrService } from "ngx-toastr";  // ✅ Import ToastrService

@Component({
  selector: "app-edit-post",
  templateUrl: "./edit-post.component.html",
  styleUrls: ["./edit-post.component.scss"],
})
export class EditPostComponent implements OnInit {
  editForm: FormGroup;
  postId: number | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private blogService: BlogService,
    private toastr: ToastrService   // ✅ Inject Toastr
  ) {
    this.editForm = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(3)]],
      brief: ["", [Validators.required, Validators.minLength(10)]],
      about: [""]
    });
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    if (id) {
      this.postId = id;
      this.loadBlog(id);
    }
  }

  loadBlog(id: number) {
    this.loading = true;
    this.error = null;

    this.blogService.getBlog(id).subscribe({
      next: (response) => {
        const blog = response.result;
        this.editForm.patchValue({
          title: blog.title,
          brief: blog.brief,
          about: blog.about
        });
        this.loading = false;
      },
      error: (error) => {
        this.error = error.message || 'Failed to load blog';
        this.toastr.error(this.error ?? 'An unknown error occurred');  // ✅ Error toast
        this.loading = false;
      }
    });
  }

  get f() {
    return this.editForm.controls;
  }

  onSubmit() {
    if (this.editForm.invalid || !this.postId) {
      this.toastr.warning('Please fix the form errors before submitting.'); // ✅ Warn if invalid
      return;
    }

    this.loading = true;
    this.error = null;

    this.blogService.updateBlog(this.postId, this.editForm.value).subscribe({
      next: () => {
        this.toastr.success('Post updated successfully!'); // ✅ Success toast
        this.router.navigate(['/blog', this.postId]);
      },
      error: (error: Error) => {
        this.error = error.message || 'Failed to update blog';
        this.toastr.error(this.error);  // ✅ Error toast
        this.loading = false;
      }
    });
  }

  onCancel() {
    if (this.postId) {
      this.router.navigate(['/blog', this.postId]);
    }
  }
}
