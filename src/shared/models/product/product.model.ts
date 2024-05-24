// export class Product {
//     constructor(public id: number, public name: string, public price: number, public checked?: boolean){

//     }
// }

export interface Product {
  id: number;
  name: string;
  price: number;
  checked: boolean;
}

export interface ProductForm {
  name: string;
  price: number;
  checked: boolean;
}

export enum Status {
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export interface ProductState {
  products:  Product[]
  keyword: string
  currentPage: number
  pageSize: number
  totalPageCount: number
  productsCount: number
  status: Status
  errorMessage: string
}