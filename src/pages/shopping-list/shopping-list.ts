import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from '../../services/shoppingList.service';
import { Ingredient } from '../../models/ingredient';

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  ingredient: {name: string, amount: number};
  ingredients: Ingredient[];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private shopplingListService: ShoppingListService) {
  }

  ionViewWillEnter() {
    this.loadItems();
  }

  onAddItem(form: NgForm) {
    this.shopplingListService.addItem(form.value.ingredientName, form.value.amount);
    form.reset();
    this.loadItems();
  }

  onDeleteItem(index:number) {
    this.shopplingListService.removeItem(index);
    this.loadItems();
  }

  private loadItems() {
    this.ingredients = this.shopplingListService.getItems();
  }
}
