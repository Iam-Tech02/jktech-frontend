import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "src/app/core/services/api.service";

@Component({
  selector: "app-edit-post",
  templateUrl: "./edit-post.component.html",
  styleUrls: ["./edit-post.component.scss"],
})
export class EditPostComponent implements OnInit {
  postId!: number;
  postForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    this.postForm = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(3)]],
      description: ["", [Validators.required, Validators.minLength(10)]],
    });
  }

  get f() {
    return this.postForm.controls;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get("id");
      if (id) {
        this.postId = +id;
        this.loadPostData();
      }
    });
  }

  loadPostData(): void {
    this.apiService.apiRequest("GET", `posts/${this.postId}`).subscribe({
      next: (post) => {
        this.postForm.patchValue(post);
      },
      error: (error) => {
        console.error("Error fetching post:", error);
        alert("Failed to load post data.");
      },
    });
  }

  updatePost(): void {
    if (this.postForm.invalid) {
      return;
    }

    const requestData = this.postForm.value;

    this.apiService
      .apiRequest("PUT", `posts/update/${this.postId}`, requestData)
      .subscribe({
        next: (response) => {
          console.log("Post Updated Successfully:", response);
          alert("Post Updated Successfully!");
        },
        error: (error) => {
          console.error("Post Update Failed:", error);
          alert("Post Update Failed!");
        },
      });
  }
}
