import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  productFormGroup!: FormGroup;
  submitted: boolean = false;

  constructor(private fb: FormBuilder, private service: ProductsService) { }

  ngOnInit(): void {
    this.productFormGroup = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(4)]],
      price: [0, Validators.required],
      quantity: [0, Validators.required],
      selected: [true, Validators.required],
      available: [true, Validators.required]
    });
  }

  get f() { return this.productFormGroup.controls }
  onSaveProduct() {
 
    this.submitted = true
    if (this.productFormGroup.invalid) return;
    this.service.SaveProduct(this.productFormGroup.value).subscribe(
      data => {
        alert("success saving product");
      }
    );
  }

  onReset(){
    this.submitted = false;
    this.productFormGroup.reset();
  }

}
