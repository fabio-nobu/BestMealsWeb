import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { Restaurant } from "../models/restaurant.model";
import { FormControl, FormGroup } from "@angular/forms";

@Injectable({providedIn: 'root'})
export class RestaurantService {
    private restaurants: Restaurant[];
    private restaurantsUpdated = new Subject<Restaurant[]>();

    apiUrl = 'http://localhost:3000/api/restaurant/';

    constructor(private http: HttpClient, private router: Router) {}

    getPosts(){
        this.http
            .get<{message: string, restaurants: any}>(this.apiUrl)
            .pipe(map((restaurantData) => {
                return restaurantData.restaurants.map((
                    restaurant: {
                        _id: string;
                        name: string;
                        address: string;
                        city: string;
                        state: string;
                        zipCode: string;
                    }
                ) => {
                    return {
                        name: restaurant.name,
                        address: restaurant.address,
                        city: restaurant.city,
                        state: restaurant.state,
                        zipCode: restaurant.zipCode,
                        id: restaurant._id
                    };
                });
            }))
            .subscribe(transformedRestaurants => {
                this.restaurants = transformedRestaurants;
                this.restaurantsUpdated.next([...this.restaurants]);
            });
    }

    public getRestaurantUpdateListener() {
        return this.restaurantsUpdated.asObservable();
    }

    addRestaurant(name: string, address: string, city: string, state: string, zipCode: string){
      const restaurant: Restaurant = {
        id: "",
        name: name,
        address: address,
        city: city,
        state: state,
        zipCode: zipCode,
        meals: [],
        evaluations: []
      };
      this.http.post<{message: string, restaurantId: string}>(this.apiUrl, restaurant )
        .subscribe((responseData) => {
          this.router.navigate(["/restaurants"]);
        })
    }

    updateRestaurant(id: string, name: string, address: string, city: string, state: string, zipCode: string){
      let restaurantData: Restaurant | FormData;
      restaurantData = {
        id: id,
        name: name,
        address: address,
        city: city,
        state: state,
        zipCode: zipCode,
        meals: [],
        evaluations: []
      }
      this.http
        .put(this.apiUrl + id, restaurantData)
        .subscribe(response => {
          this.router.navigate(["/"])
        })
    }

    deleteRestaurant(restaurantId: string) {
      this.http.delete(this.apiUrl + restaurantId)
        .subscribe(() => {
          const updatedRestaurants = this.restaurants.filter(restaurant => restaurant.id !== restaurantId);
          this.restaurants = updatedRestaurants;
          this.restaurantsUpdated.next([...this.restaurants]);
        })
    }
}
