import { LoadingService } from './../../services/loading/loading.service';
import { ProductService } from './../../services/product/product.service';
import { Component, OnInit } from '@angular/core';
import {
  Product,
} from '../../../../shared/models/product/product.model';
import { Router } from '@angular/router';
import { AppStateService } from '../../services/app-state/app-state.service';
import { Roles } from '../../../../shared/models/user/user.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  isLoading: boolean = false;
  constructor(
    private productService: ProductService,
    private route: Router,
    public appStateService: AppStateService,
    public loadingService: LoadingService
  ) {
    loadingService.isLoading$.subscribe(result => {
      this.isLoading = result
    })
   
  }

  ngOnInit(): void {
    const { currentPage } = this.appStateService.productState;
    this.fetchProducts(currentPage);
    
  }
  fetchProducts(page: number) {
    const { pageSize, keyword } = this.appStateService.productState;

    this.productService.getProducts(page, pageSize, keyword).subscribe({
      next: (res) => {
        const totalCount = +res.headers.get('x-total-count')!;
        const pageCount = Math.ceil(totalCount / pageSize);
          this.appStateService.setProductState({
            products: res.body as Product[],
            productsCount: totalCount,
            totalPageCount: pageCount > 0 ? pageCount : 0,
            currentPage: page
          });
      
      },
      error: (err) => {
        console.error(err);
      },
    });

    //this.products$ = this.productService.getProducts();  // $ = 'Observable'
  }

  handleToggleChecked(product: Product) {
    this.productService.checkProduct(product).subscribe({
      next: (updatedProduct) => {
        product.checked = updatedProduct.checked;
      },
      error: (err) => console.error(err),
    });
  }

  handleDeleteProduct(product: Product) {
    let decision = confirm('Are you sure want to delete this product');

    if (decision) {
      this.productService.deleteProduct(product).subscribe({
        next: () => {
          const { currentPage } = this.appStateService.productState;
          this.appStateService.setProductState({
            products: this.appStateService.productState.products.filter(
              (p) => p.id !== product.id
            ),
          });

          this.fetchProducts(currentPage);
        },
        error: (err) => console.error(err),
      });
    }
  }

  handleEditProduct(product: Product) {
    this.route.navigateByUrl(`/admin/edit-product/${product.id}`);
  }

  get isAdmin(){
    return this.appStateService.authState.roles.includes(Roles.ADMIN)
  }
}
