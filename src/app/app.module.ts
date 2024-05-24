import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './core/components/home/home.component';
import { ProductsComponent } from './core/components/products/products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { ProductFormComponent } from './core/components/product-form/product-form.component';

import { DashboardComponent } from './core/components/dashboard/dashboard.component';
import { NavBarComponent } from './core/components/nav-bar/nav-bar.component';
import { AppErrorComponent } from './core/components/app-error/app-error.component';
import { appHttpInterceptor } from './core/interceptors/app-http.interceptor';
import { LoginComponent } from './core/components/login/login.component';
import { AdminTemplateComponent } from './core/components/admin-template/admin-template.component';
import { NotAuthorizedComponent } from './core/components/not-authorized/not-authorized.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { EditProductComponent } from './core/components/edit-product/edit-product.component';


@NgModule({
  declarations: [AppComponent, HomeComponent, ProductsComponent, ProductFormComponent, EditProductComponent, DashboardComponent, NavBarComponent, AppErrorComponent, LoginComponent, AdminTemplateComponent, NotAuthorizedComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    provideHttpClient(withInterceptors([appHttpInterceptor])),
  ], // for services
  bootstrap: [AppComponent], // entry point for the app
})
export class AppModule {}
