import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductService } from './services/product.service';
import{Routes,RouterModule} from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ElasticSearchComponent } from './components/elastic-search/elastic-search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NgxTypeaheadModule } from 'ngx-typeahead';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { AutoCompletgeComponent } from './components/auto-completge/auto-completge.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

const routes:Routes=[
  {path: 'products/:id', component:ProductDetailsComponent},
  {path: 'search', component:ProductListComponent},

  {path: 'search/:keyword', component:ProductListComponent},
  {path:'category/:id/:name', component:ProductListComponent},
  {path:'category', component:ProductListComponent},
  {path:'products', component:ProductListComponent},
  {path:'', redirectTo:'/products', pathMatch:'full'},
  {path:'category/:id', redirectTo:'/products', pathMatch:'full'}

]
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ElasticSearchComponent,
    ProductDetailsComponent,
    AutoCompletgeComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxTypeaheadModule,
    AutocompleteLibModule,
    NgbModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
