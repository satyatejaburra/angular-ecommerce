import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { CartService } from '../../services/cart.service';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

products:Product[];
currentCategoryId:number;
previousCategoryId: number;
currentCategoryName:string;
searchMode:boolean;
thePageNumber: number=1;
thePageSize:number=5;
theTotalElements:number=0;
thePreviousKeyword:string;


  constructor(private productService: ProductService, private route:ActivatedRoute, private cartService:CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
    this.listProducts();})
  }

  addToCart(theProduct: Product) {

    console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`);

    // TODO ... do the real work
    const theCartItem = new CartItem(theProduct);

    this.cartService.addToCart(theCartItem);
  }

  handleListProducts()
  {
    const hasCategoryId:boolean=this.route.snapshot.paramMap.has('id');


    if(hasCategoryId)
    {
      console.log("I am " +this.route.snapshot.paramMap.get('categoryName'));
      this.currentCategoryId=+this.route.snapshot.paramMap.get('id');
      this.currentCategoryName=this.route.snapshot.paramMap.get('name');
    }
    else{
      //not category id is available
      this.currentCategoryId=1;
      this.currentCategoryName='Books';
    }

    if(this.previousCategoryId!=this.currentCategoryId)
    {
      this.thePageNumber=1;
    }
    this.previousCategoryId=this.currentCategoryId;

    console.log(`currentcategoryid=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`)

    this.productService.getProductListPaginate(this.thePageNumber-1, this.thePageSize, this.currentCategoryId).
    subscribe(this.processResult());

  }

  updatePageSize(pageSize:number)
  {
    this.thePageSize=pageSize;
    this.thePageNumber=1;
    this.listProducts();

  }

  private processResult(){
return  data=>{
  this.products=data._embedded.products;
  this.thePageNumber=data.page.number+1;
  this.thePageSize=data.page.size;
  this.theTotalElements=data.page.totalElements;
}
  }

  private processSearchResult(){
    return  data=>{
      this.products=data;
      this.thePageNumber=data.page.number+1;
      this.thePageSize=data.page.size;
      this.theTotalElements=data.page.totalElements;
    }
      }

  listProducts()
  {
    this.searchMode=this.route.snapshot.paramMap.has('keyword');
    if(this.searchMode)
    {
      this.handleSearchProducts();
    }
    else{
    this.handleListProducts();
    }
  }
  handleSearchProducts() {
    console.log("handleSearchProducts");
    const theKeyword:string=this.route.snapshot.paramMap.get('keyword');

    if(this.thePreviousKeyword!=theKeyword)
    {
      this.thePageNumber=1;
    }
    this.thePreviousKeyword=theKeyword;
    console.log(`keyword= ${theKeyword}`)
    //now search for products with given keyword
  //  this.productService.searchProductsPaginate(this.thePageNumber-1, this.thePageSize,theKeyword).subscribe(
      this.productService.searchProducts(theKeyword).subscribe(
         data=>{
          this.products=data;
            }
    )
  }
}
