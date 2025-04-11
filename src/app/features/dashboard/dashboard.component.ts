import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService, Blog } from 'src/app/core/services/blog.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public selectedIndex: number = 0;
  blogs: Blog[] = [];
  loading: boolean = true;
  error: string | null = null;
  private blogIdToDelete: number | null = null;

  constructor(private blogService: BlogService, private router: Router) {}

  ngOnInit() {
    this.loadBlogs();
  }

  loadBlogs() {
    this.loading = true;
    this.error = null;
    
    this.blogService.getBlogs().subscribe({
      next: (response) => {
        this.blogs = response.result;
        console.log(this.blogs);
        this.loading = false;
      },
      error: (error) => {
        this.error = error.message || 'Failed to load blogs';
        this.loading = false;
      }
    });
  }

  goTOCreate() {
    this.router.navigate(['/blog/create']);
  }

  openDeleteModal(blogId: number) {
    this.blogIdToDelete = blogId;
    const modal = document.getElementById('deleteModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
      modal.setAttribute('aria-modal', 'true');
    }
  }

  closeDeleteModal() {
    const modal = document.getElementById('deleteModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      modal.removeAttribute('aria-modal');
    }
  }

  confirmDelete() {
    if (this.blogIdToDelete) {
      this.blogService.deleteBlog(this.blogIdToDelete).subscribe({
        next: () => {
          this.closeDeleteModal();
          this.loadBlogs();
        },
        error: (error) => {
          this.error = 'Failed to delete blog';
          this.closeDeleteModal();
        }
      });
    }
  }
}
