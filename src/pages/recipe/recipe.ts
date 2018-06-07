import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Recipe } from '../../models/recipe';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { RecipeService } from '../../services/recipe.service';
import { ShoppingListService } from '../../services/shoppingList.service';


@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit {
  recipe: Recipe;
  index: number;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private recipeService: RecipeService,
    private slListService: ShoppingListService
  ) {}

  ngOnInit() {
    this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('index');
  }

  onEditRecipe() {
    this.navCtrl.push(EditRecipePage, {mode:'Edit', recipe: this.recipe, index: this.index});
  }

  onDeleteRecipe(){
    this.recipeService.removeRecipe(this.index);
    this.navCtrl.popToRoot();
  }

  onAddIngredients() {
    this.slListService.addItems(this.recipe.ingredients);
  }
}
