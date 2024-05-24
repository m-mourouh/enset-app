import { ProductService } from './../../services/product/product.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnInit{
  productForm!: FormGroup;
  isProductAdded: boolean = false;
  constructor(private productService: ProductService){

  }

  ngOnInit(): void {
      this.productForm = new FormGroup({
        name: new FormControl("", [Validators.required]),
        price: new FormControl(0),
        checked: new FormControl(false)
      })
  }

  addProduct(){
      const product = this.productForm.value;

      this.productService.saveProduct(product).subscribe({
        next: newProduct => {
            this.isProductAdded = true;
            this.productForm.reset();
        },
        error: err => console.error(err)
      })
  }
}
