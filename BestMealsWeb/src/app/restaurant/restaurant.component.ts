/*
* @author: Fabio Nobuyoshi Moriya Yusuki
* @description: Componente de restaurante. Responsavel pela aberta dos dialogs de cadastro e edição e pela deleção de restaurante.
*/

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

/*
* @description: set das variaveis e constantes a serem utilizadas
*/
  restaurants: Restaurant[] = [];
  private restaurantsSub: Subscription = new Subscription;
  //configuração dos headers responsaveis pelo controle de quais colunas serão exibidas na tabela
  columnsToDisplay = ['name', 'address', 'city', 'state', 'zipCode', 'actions'];


  constructor(
    public dialog:MatDialog,
    public restaurantService: RestaurantService
  ) { }

  //função que abre o dialog de cadastro de restaurante
  onAdd(){
    const dialogRef = this.dialog.open(AddRestaurantComponent, {
      minWidth: '30%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog fechado')
    })
  }

  //função que abre o dialog de edição de restaurante. Também é responsavel por enviar os dados do restaurante selecionado para o componente de Edição de restaurante
  onEdit(restaurant){
    const editDialogRef = this.dialog.open(EditRestaurantComponent, {
      minWidth: '30%',
      data: restaurant
    });

    editDialogRef.afterClosed().subscribe(result => {
      console.log('Dialog fechado')
    })
  }

  //Ao iniciar o componente, automaticamente consulta todos os restaurantes a serem exibidos na tabela
  ngOnInit(): void {
    this.restaurantService.getPosts();
    this.restaurantsSub = this.restaurantService.getRestaurantUpdateListener()
      .subscribe((fetchedRestaurants: Restaurant[]) => {
        this.restaurants = fetchedRestaurants;
      });
  }

  //função que deleta o restaurante selecionado enviando o parametro restauranteId
  onDelete(restaurantId: string){
    this.restaurantService.deleteRestaurant(restaurantId);
    window.location.reload();
  }

  ngOnDestroy(){
    this.restaurantsSub.unsubscribe();
  }

}
