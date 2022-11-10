import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActionEvent, AppDataState, DataStateEnum, ProductActionsTypes } from 'src/app/state/product.state';
import { Product } from 'src/app/model/product.model';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {


  @Input() productsInput$: Observable<AppDataState<Product[]>> | null = null;
  @Output() productEventEmitter: EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();
  readonly DataStateEnum = DataStateEnum;

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(product: Product) {
    this.productEventEmitter.emit({ type: ProductActionsTypes.SELECTED_PRODUCTS, payload: product });
  }

  onDelete(product: Product) {
    this.productEventEmitter.emit({ type: ProductActionsTypes.DELETE_PRODUCTS, payload: product });
  }

  onEdit(product: Product) {
    this.productEventEmitter.emit({ type: ProductActionsTypes.UPDATE_PRODUCTS, payload: product });
  }
  onActionEventitem($event:ActionEvent) {
    this.productEventEmitter.emit($event);

    }

  }



