import { Component } from '@angular/core';
import { Listing } from 'src/app/core/models/listing.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public selectedIndex: number = 0;

  listings: Listing[] = [
    { title: 'Post One', description: 'This is the first post description.' },
    { title: 'Post Two', description: 'This is the second post description.' },
    { title: 'Post Three', description: 'This is the third post description.' }
  ];

  deleteListing(index: number) {
    this.listings.splice(index, 1);
  }
}
