import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Product } from '../common/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

   private baseUrl="http://localhost:8080/api/products";
   private allProductUrl="http://localhost:8080/api/products?page=0&size=150";

   private productBynameUrl="http://localhost:8080/api/products?page=0&size=150";


  private categoryUrl="http://localhost:8080/api/product-category";


  constructor(private httpClient:HttpClient) {}

  getProduct(theProductId:number): Observable<Product>{
    const productUrl=`${this.baseUrl}/${theProductId}`;
    return this.httpClient.get<Product>(productUrl);

  }

   getProductsList(theCategoryId:number): Observable<Product[]>{
     const url=`${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.httpClient.get<GetResponse>(url).pipe(
      map(response=>response._embedded.products)
    );
}

getAllProductsList(): Observable<Product[]>{
  const url=`${this.allProductUrl}`;

 return this.httpClient.get<GetResponse>(url).pipe(
   map(response=>response._embedded.products)
 );
}

getProductsListByProductName(theKeyword: string): Observable<Product[]>{
  const searchUrl=`${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
 return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
  map(response=>response._embedded.products));

}

searchProducts(theKeyword:string): Observable<Product[]>
{
const searchUrl=`${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(map(response=>response._embedded.products));
}

searchProductsPaginate(thePage: number, thePageSize:number,theKeyword:string): Observable<GetResponseProducts>
{
const searchUrl=`${this.baseUrl}/search/findByNameContaining` + `?name=${theKeyword}&page=${thePage}&size=${thePageSize}`;
return this.httpClient.get<GetResponseProducts>(searchUrl);
}

getProductListPaginate(thePage: number, thePageSize:number, theCategoryId:number):Observable<GetResponseProducts>

{
  const url=`${this.baseUrl}/search/findByCategoryId` + `?id=${theCategoryId}&page=${thePage}&size=${thePageSize}`;
  return this.httpClient.get<GetResponseProducts>(url);

}


getProductCategories(): Observable<ProductCategory[]>{
 return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
   map(response=>response._embedded.productCategory)
 );
}}

interface GetResponse{
  _embedded:{
    products:Product[];
  }


}
interface GetResponseProductCategory{
  _embedded:{
    productCategory:ProductCategory[];

  }}

  interface GetResponseProducts{
    _embedded:{
      products:Product[];

    },

    page:{
      size:20,
      totalElements: 100,
      totalPages:5,
      number:0
    }
  }

