import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  blog: any;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // const id = this.route.snapshot.paramMap.get('id');
    // if (id) {
    //   this.blogService.getBlogById(+id).subscribe(data => {
    //     this.blog = data;
    //   });
    // }
  }
}
