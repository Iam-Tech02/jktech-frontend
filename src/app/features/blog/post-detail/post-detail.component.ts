import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService, Blog } from 'src/app/core/services/blog.service';

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
    private blogService: BlogService
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
          this.router.navigate(['/blog']);
        },
        error: (error) => {
          this.error = error.message;
        }
      });
    }
  }
}
