import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NO_ERRORS_SCHEMA, APP_INITIALIZER } from '@angular/core';

import {DecimalPipe} from '@angular/common';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { AuthenticationService } from './services/authentication.service';
import { AlertService } from './services/alert.service';

import { ReactiveFormsModule } from '@angular/forms';
import { fakeBackendProvider } from './helpers';


import { Routes, RouterModule} from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { AutoCompletgeComponent } from './components/auto-completge/auto-completge.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { NgxTypeaheadModule } from 'ngx-typeahead';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AlertComponent } from './components/alert/alert.component';
import { MaterialModule } from './material/material.module';

import { CommonModule } from '@angular/common';
import { AuthGuard, JwtInterceptor, ErrorInterceptor } from './helpers';
import { FormsModule } from '@angular/forms';

import { ChatDialogComponent } from './components/chat-dialog/chat-dialog.component';
import { ChatService } from './services/chat.service';
import { WindowComponent } from './components/window/window.component';
import { PortalModule } from '@angular/cdk/portal';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalComponent as ModalComponent } from './components/modal/modal.component';
import { Orderdetails } from './common/orderdetails';
import { OrderComponent } from './components/order/order.component';
import { PaymentComponent } from './components/payment/payment.component';
import { OrderstatusComponent } from './components/orderstatus/orderstatus.component';
import { OrderdetailsComponent } from './components/orderdetails/orderdetails.component';
import { AuthRoutingModule } from './auth-routing.module';
import { HomeComponent } from './home/home.component';
import { OktaCallbackComponent } from '@okta/okta-angular';
import { CarousalOfferComponent } from './components/carousal-offer/carousal-offer.component';
import { OrderTableComponent } from './components/order-table/order-table.component';
import { SortableDirective } from './directives/sortable.directive';

const routes: Routes = [

  { path: 'orderDetails', component: OrderdetailsComponent },
  { path: 'ordertable', component: OrderTableComponent },

  { path: 'orderstatus', component: OrderstatusComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'order', component: OrderComponent },
  { path: 'register', component: RegisterComponent },
  {path: 'cart-details', component: CartDetailsComponent},
  {path: 'products/:id', component:ProductDetailsComponent},
  {path: 'search', component:ProductListComponent},
  {path: 'search/:keyword', component:ProductListComponent},
  {path: 'category/:id', component: ProductListComponent},
  {path: 'category', component: ProductListComponent},
  {path: 'products', component: ProductListComponent},
  { path: 'login', component: LoginComponent },
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: '**', redirectTo: '/products', pathMatch: 'full'},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'implicit/callback',
    component: OktaCallbackComponent
  },
  { path: '', component: ProductDetailsComponent, canActivate: [AuthGuard] }

];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    AutoCompletgeComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    ChatDialogComponent,
    WindowComponent,
    ModalComponent,
    OrderComponent,
    PaymentComponent,
    OrderstatusComponent,
    OrderdetailsComponent,
    CarousalOfferComponent,
    OrderTableComponent,
    SortableDirective
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgxTypeaheadModule,
    AutocompleteLibModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,

    MaterialModule,
    PortalModule,CommonModule, AuthRoutingModule
  ],
  providers: [ProductService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider,ChatService,DecimalPipe
  ],
  exports: [OrderTableComponent],
  bootstrap: [AppComponent,OrderTableComponent]
})
export class AppModule { }
