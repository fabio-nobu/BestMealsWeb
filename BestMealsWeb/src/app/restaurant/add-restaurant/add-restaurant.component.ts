import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css']
})
export class AddRestaurantComponent implements OnInit {
  public addRestaurantForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddRestaurantComponent>
  ) { }

  cancel(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
      this.addRestaurantForm = this.fb.group({

      })
  }
}
