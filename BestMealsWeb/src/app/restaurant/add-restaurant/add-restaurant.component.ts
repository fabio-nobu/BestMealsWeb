import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css']
})
export class AddRestaurantComponent implements OnInit {

  constructor(
    public restaurantService: RestaurantService,
    public dialogRef: MatDialogRef<AddRestaurantComponent>
  ) { }

  cancel(): void {
    this.dialogRef.close();
  }

  addRestaurant(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.restaurantService.addRestaurant(form.value.name, form.value.address, form.value.city, form.value.state, form.value.zipCode );
    form.resetForm();
    this.dialogRef.close();
    window.location.reload();
  }

  ngOnInit(): void {

  }
}
