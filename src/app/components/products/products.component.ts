import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { map, Observable, startWith, catchError, of } from 'rxjs'
import { ActionEvent, AppDataState, DataStateEnum, ProductActionsTypes } from 'src/app/state/product.state';
import { Router } from '@angular/router';





@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products$: Observable<AppDataState<Product[]>> | null = null;
  readonly DataStateEnum = DataStateEnum;

  constructor(private productService: ProductsService, private router: Router) { }

  ngOnInit(): void {

  }

  //onGetAllProducts():affichage de tous les produits
  onGetAllProducts() {
    this.products$ = this.productService.getAllProducts().pipe(
      map(data => ({ dataState: DataStateEnum.LOADED, data: data })),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError(err => of({ dataState: DataStateEnum.ERROR, errorMessage: err.message })),
    );
  }


  onGetSelectedProducts() {
    this.products$ = this.productService.getSelectedProducts().pipe(
      map(data => ({ dataState: DataStateEnum.LOADED, data: data })),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError(err => of({ dataState: DataStateEnum.ERROR, errorMessage: err.message })),
    );
  }

  onGetAvailableProducts() {
    this.products$ = this.productService.getAvailableProducts().pipe(
      map(data => ({ dataState: DataStateEnum.LOADED, data: data })),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError(err => of({ dataState: DataStateEnum.ERROR, errorMessage: err.message })),
    );
  }

  //onSearch(): recherche d'un produit
  onSearch(dataForm: any) {
    this.products$ = this.productService.SearchProducts(dataForm.keyword).pipe(
      map(data => ({ dataState: DataStateEnum.LOADED, data: data })),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError(err => of({ dataState: DataStateEnum.ERROR, errorMessage: err.message })),
    );
  }
  //onSelect: changer la valeur de l'attribut selected
  onSelect(product: Product) {
    this.productService.SelectProduct(product).subscribe(
      data => {
        product.selected = data.selected;
        //this.onGetAllProducts();
      }
    )
  }
  //onDelete(product): supprimer un produit
  onDelete(product: Product) {
    let v = confirm("êtes-vous sûr de vouloir supprimer ce produit?");
    if (v == true)
      this.productService.DeleteProduct(product).subscribe(
        data => {
          this.onGetAllProducts();
        }
      )
  }

  // ajout d'un nouveau product
  onNewProducts() {

    this.router.navigateByUrl("/newProduct");
  }

  onEdit(product: Product) {
    this.router.navigateByUrl("/editProduct/" + product.id);
  }

  onActionEventNavbar($event: ActionEvent) {
    switch ($event.type) {
      case ProductActionsTypes.GET_ALL_PRODUCTS: this.onGetAllProducts();
        break;
      case ProductActionsTypes.GET_SELECTED_PRODUCTS: this.onGetSelectedProducts();
        break;
      case ProductActionsTypes.GET_AVAILABLE_PRODUCTS: this.onGetAvailableProducts();
        break;
      case ProductActionsTypes.SEARCH_PRODUCTS: this.onSearch($event.payload);
        break;
      case ProductActionsTypes.NEW_PRODUCTS: this.onNewProducts();
        break;
    }
  }

  onActionEventList($event: ActionEvent) {
    switch ($event.type) {
      case ProductActionsTypes.SELECTED_PRODUCTS: this.onSelect($event.payload);
        break;
      case ProductActionsTypes.DELETE_PRODUCTS: this.onDelete($event.payload);
        break;
      case ProductActionsTypes.UPDATE_PRODUCTS: this.onEdit($event.payload);
    }
  }

}
