import { Injectable } from '@angular/core';
import { Product } from '../../../../shared/models/product/product.model';
import { Roles } from '../../../../shared/models/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  
  public productState = {
    products: [] as Product[],
    keyword: '',
    currentPage: 1,
    pageSize: 3,
    totalPageCount: 0,
    productsCount: 0,
    status: "",
    errorMessage: ""
  }
  public authState = {
    isAuthenticated: false,
    username: undefined,
    roles: [] as Roles[],
  }


  constructor() { }


  setProductState(state: any){
      this.productState = {...this.productState, ...state}
  }
  setAuthState(state: any){
    this.authState = {...this.authState, ...state}
  }

  resetAuthState(){
    this.authState = {
      isAuthenticated: false,
      username: undefined,
      roles: []
    }
  }

}
