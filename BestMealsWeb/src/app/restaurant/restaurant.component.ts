import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddRestaurantComponent } from './add-restaurant/add-restaurant.component';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {
  constructor(
    public dialog:MatDialog
  ) { }

  addRestaurant(){
    const dialogRef = this.dialog.open(AddRestaurantComponent, {
      width: '70%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog fechado')
    })
  }

  ngOnInit(): void {
  }

}
