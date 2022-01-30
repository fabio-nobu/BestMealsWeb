import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Restaurant } from '../shared/models/restaurant.model';
import { RestaurantService } from '../shared/services/restaurant.service';
import { AddRestaurantComponent } from './add-restaurant/add-restaurant.component';
import { EditRestaurantComponent } from './edit-restaurant/edit-restaurant.component';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  restaurants: Restaurant[] = [];
  private restaurantsSub: Subscription = new Subscription;
  columnsToDisplay = ['name', 'address', 'city', 'state', 'zipCode', 'actions'];

  constructor(
    public dialog:MatDialog,
    public restaurantService: RestaurantService
  ) { }

  onAdd(){
    const dialogRef = this.dialog.open(AddRestaurantComponent, {
      minWidth: '30%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog fechado')
    })
  }

  onEdit(restaurant){
    const editDialogRef = this.dialog.open(EditRestaurantComponent, {
      minWidth: '30%',
      data: restaurant
    });

    editDialogRef.afterClosed().subscribe(result => {
      console.log('Dialog fechado')
    })
  }

  ngOnInit(): void {
    this.restaurantService.getPosts();
    this.restaurantsSub = this.restaurantService.getRestaurantUpdateListener()
      .subscribe((fetchedRestaurants: Restaurant[]) => {
        this.restaurants = fetchedRestaurants;
      });
  }

  onDelete(restaurantId: string){
    this.restaurantService.deleteRestaurant(restaurantId);
    window.location.reload();
  }

  ngOnDestroy(){
    this.restaurantsSub.unsubscribe();
  }

}
