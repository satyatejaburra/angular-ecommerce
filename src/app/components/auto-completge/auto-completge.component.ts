import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { logging } from 'protractor';
import { Product } from 'src/app/common/product';

@Component({
  selector: 'app-auto-completge',
  templateUrl: './auto-completge.component.html',
  styleUrls: ['./auto-completge.component.css']
})
export class AutoCompletgeComponent implements OnInit {
  keyword='name';
  searchKeyWord:string;
  thePageNumber: number=1;
thePageSize:number=5;
theTotalElements:number=0;

  products:Product[];
  currentCategoryId:number;
currentCategoryName:string;

    constructor(private productService: ProductService, private route:ActivatedRoute, private router:Router) {

   // this.route.paramMap.subscribe(()=>{
     // this.listProducts();})
   }

   doSearch()
   {
 this.router.navigateByUrl(`/search/${this.searchKeyWord}`);
}

   listProducts() {
        this.productService.getAllProductsList().subscribe(
      data=>{
        this.products=data;
      }
    )
  }

  ngOnInit() {
  }

  selectEvent(item: { name: string; }) {
   console.log("selectEvent " + item.name);
   this.router.navigateByUrl(`/search/${item.name}`);
  }

  onChangeSearch(val: string) {
    this.searchKeyWord=val;
    console.log("onChangeSearch " + val);

    this.productService.getProductsListByProductName(val).subscribe(
     this.processResult())
  }

  private processResult(){
    return  data=>{
      this.products=data;
    }
      }

  onFocused(e){
    console.log("onFocused " + e.name);
  }
}
