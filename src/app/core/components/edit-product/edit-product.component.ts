import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product/product.service';
import { ProductForm } from '../../../../shared/models/product/product.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent implements OnInit{
  productId!: number;
  isProductUpdated: boolean = false;
  productForm!: FormGroup;

  constructor(private route: ActivatedRoute, private productService: ProductService){}

  ngOnInit(): void {
    this.productForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      price: new FormControl(0),
      checked: new FormControl(false)
    });
    
    this.fetchProduct(this.route.snapshot.params["id"])
  }

  fetchProduct(productId: number){
      this.productService.getProductById(productId)
      .subscribe({
        next: p => {
          this.productId = p.id
          this.setProductForm(p);
        ;
        },
        error: err => console.error(err)
      })
  }

  setProductForm({name, price, checked}: ProductForm){
    this.productForm.setValue({name, price, checked});
  }
  updateProduct(){
    const product = {...this.productForm.value, id: this.productId}
    this.productService.updateProduct(product).subscribe({
      next: updatedProduct => {
          this.isProductUpdated = true;
          this.setProductForm(updatedProduct);

          console.log("updatedProduct", updatedProduct);
      },
      error: err => console.error(err)
    })
  }
  
}
