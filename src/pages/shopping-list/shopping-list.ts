import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from '../../services/shoppingList.service';
import { Ingredient } from '../../models/ingredient';
import { AuthService } from '../../services/auth';
import { DatabaseOptionsPage } from '../database-options/database-options';


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
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
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
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    })
    const popover = this.popoverCtrl.create(DatabaseOptionsPage);
    popover.present({ev: event});
    popover.onDidDismiss(
      data => {
        if (data == null) {
          return;
        }
        if(data.action == 'load') {
          loading.present()
          this.authService.getActiveUser().getIdToken()
            .then(
              (token: string) => {
                this.shopplingListService.fetchList(token)
                  .subscribe(
                    (list: Ingredient[])=>{
                      loading.dismiss();
                      if (list){
                        this.ingredients = list;
                      } else {
                        this.ingredients = [];
                      }
                    },
                    error=> {
                      loading.dismiss();
                      this.handleError(error.json().message);
                    }
                  );
              }
            );
        } else if (data.action == 'store') {
          loading.present();
          this.authService.getActiveUser().getIdToken().then(
            (token: string) => {
              this.shopplingListService.storeList(token)
                .subscribe(
                  
                  ()=>loading.dismiss(),
                  error=> {
                    loading.dismiss();
                    this.handleError(error.json().message);
                  }
                );
            }
          );
        }
      }
    );
  }

  private handleError(errorMessage: string) {
    const alert = this.alertCtrl.create({
      title: 'An errror occured!',
      message: errorMessage,
      buttons: ['OK']
    });
    alert.present();
  }
}
