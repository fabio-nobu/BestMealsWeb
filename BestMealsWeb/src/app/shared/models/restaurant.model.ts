import { Meal } from "./meal.model" ;
import { RestaurantEvaluation } from "./restaurantEvaluation.models";

export interface Restaurant {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  meals: Meal[];
  evaluations: RestaurantEvaluation[];
}
