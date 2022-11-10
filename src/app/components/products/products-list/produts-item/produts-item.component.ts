import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { EventDriverService } from 'src/app/state/event.driver.service';
import { ActionEvent, ProductActionsTypes } from 'src/app/state/product.state';

@Component({
  selector: 'app-produts-item',
  templateUrl: './produts-item.component.html',
  styleUrls: ['./produts-item.component.css']
})
export class ProdutsItemComponent implements OnInit {

  @Input() product!: Product;
  //@Output() eventEmetter: EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();

  constructor(private eventDriverService: EventDriverService) { }

  ngOnInit(): void {
  }

  onSelect(product: Product) {
    //this.eventEmetter.emit({ type: ProductActionsTypes.SELECTED_PRODUCTS, payload: product })
    this.eventDriverService.publishEvent({ type: ProductActionsTypes.SELECTED_PRODUCTS, payload: product });
  }

  onDelete(product: Product) {
    //this.eventEmetter.emit({ type: ProductActionsTypes.DELETE_PRODUCTS, payload: product });
    this.eventDriverService.publishEvent({ type: ProductActionsTypes.DELETE_PRODUCTS, payload: product });
  }

  onEdit(product: Product) {
    //this.eventEmetter.emit({ type: ProductActionsTypes.UPDATE_PRODUCTS, payload: product });
    this.eventDriverService.publishEvent({ type: ProductActionsTypes.UPDATE_PRODUCTS, payload: product });
  }
}
