/*
* @author: Fabio Nobuyoshi Moriya Yusuki
* @description: modulo responsavel pela configuração das rotas
*/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { MealComponent } from './meal/meal.component';

/*
* @description: verifica a URL a ser acessada e para qual componente será direcionado
*/
const routes: Routes = [
  { path: 'restaurants', component: RestaurantComponent },
  { path: 'meals', component: MealComponent},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
