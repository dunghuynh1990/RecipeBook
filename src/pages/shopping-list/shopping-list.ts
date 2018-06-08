import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from '../../services/shoppingList.service';
import { Ingredient } from '../../models/ingredient';
import { SLOptionsPage } from './sl-options/sl-options';
import { AuthService } from '../../services/auth';


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
    private shopplingListService: ShoppingListService,
    private popoverCtrl: PopoverController,
    private authService: AuthService
  ) {}

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

  onShowOptions(event: MouseEvent) {
    const popover = this.popoverCtrl.create(SLOptionsPage);
    popover.present({ev: event});
    popover.onDidDismiss(
      data => {
        if(data.action == 'load') {

        } else {
          this.authService.getActiveUser().getIdToken()
            .then(
              (token: string) => {
                this.shopplingListService.storeList(token)
                  .subscribe(
                    ()=>console.log('Success!'),
                    error=> {
                      console.log(error);
                    }
                  );
              }
            );
        }
      }
    );
  }
}
