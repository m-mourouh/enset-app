import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { Product } from '../../../../shared/models/product/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url = `http://localhost:3000/products`;

  constructor(private http: HttpClient) {}

  getProducts(page: number, size: number, keyword: string) {
    return this.http.get(
      `${this.url}?name_like=${keyword}&_page=${page}&_limit=${size}`,
      { observe: 'response' }
    );
  }

  checkProduct(product: Product): Observable<Product> {
    return this.http.patch<Product>(`${this.url}/${product.id}`, {
      checked: !product.checked,
    });
  }

  deleteProduct(product: Product): Observable<any> {
    return this.http.delete(`${this.url}/${product.id}`);
  }

  saveProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.url, product);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.url}/${id}`);
  }

  updateProduct(product: Product): Observable<Product> {
      return this.http.put<Product>(`${this.url}/${product.id}`, product);
  }
}
