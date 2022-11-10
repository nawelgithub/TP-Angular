import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  submitted: boolean = false;
  productId!: number
  productFormGroup!: FormGroup;

  constructor(private activateRoute: ActivatedRoute,
    private productService: ProductsService,
    private fb: FormBuilder) {

    activateRoute.params.subscribe((params) => {
      console.log({ params })
      this.productId = params['id']
      if (this.productId) this.getProducts(this.productId)
    })
  }

  ngOnInit(): void {


  }

  get f() { return this.productFormGroup.controls }

  getProducts(id: any) {
    this.productService.getProducts(id).subscribe(
      product => {
        //console.log({product})
        this.productFormGroup=this.fb.group({
          id: [product.id],
          name: [product.name, [Validators.required, Validators.minLength(4)]],
          price: [product.price, Validators.required],
          quantity: [product.quantity, Validators.required],
          selected: [product.selected, Validators.required],
          available: [product.available, Validators.required],
        })
      });
  }

  onUpdateProduct() {
    this.submitted = true
    if (this.productFormGroup.invalid) return;
    this.productService.UpdateProducts(this.productFormGroup.value).subscribe(
      data => {
        console.log({data});
        alert("success product updated");
      }
    );
  }

}
