import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService, Blog } from 'src/app/core/services/blog.service';
import { ToastrService } from 'ngx-toastr';  // ✅ Import ToastrService

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  blog: Blog | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService,
    private toastr: ToastrService   // ✅ Inject ToastrService
  ) {}

  ngOnInit(): void {
    this.loadBlog();
  }

  loadBlog(): void {
    this.loading = true;
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.blogService.getBlogById(+id).subscribe({
        next: (response) => {
          this.blog = response.result;
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Failed to load blog';
          this.toastr.error(this.error);   // ✅ Error toast
          this.loading = false;
        }
      });
    }
  }

  deleteBlog(): void {
    if (!this.blog) return;

    if (confirm('Are you sure you want to delete this blog post?')) {
      this.blogService.deleteBlog(this.blog.id).subscribe({
        next: () => {
          this.toastr.success('Blog deleted successfully!');  // ✅ Success toast
          this.router.navigate(['/blog']);
        },
        error: (error) => {
          this.error = error.message || 'Failed to delete blog';
          this.toastr.error(this.error ?? undefined);  // ✅ Error toast
        }
      });
    } else {
      this.toastr.info('Deletion cancelled.');  // ✅ Optional info toast
    }
  }
}
