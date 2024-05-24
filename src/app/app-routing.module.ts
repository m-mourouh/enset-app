import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { ProductsComponent } from './core/components/products/products.component';
import { ProductFormComponent } from './core/components/product-form/product-form.component';

import { LoginComponent } from './core/components/login/login.component';
import { AdminTemplateComponent } from './core/components/admin-template/admin-template.component';
import { authentificationGuard } from './core/guards/authentification/authentification.guard';
import { authorizationGuard } from './core/guards/authorization/authorization.guard';
import { NotAuthorizedComponent } from './core/components/not-authorized/not-authorized.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { EditProductComponent } from './core/components/edit-product/edit-product.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'admin',
    component: AdminTemplateComponent,
    canActivate: [authentificationGuard],
    children: [
      { path: 'products', component: ProductsComponent },
      { path: 'add-product', component: ProductFormComponent, canActivate: [authorizationGuard] },
      { path: 'edit-product/:id', component: EditProductComponent,  canActivate: [authorizationGuard]},
      { path: 'home', component: HomeComponent },
      { path: 'not-authorized', component: NotAuthorizedComponent },
    ],
  },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
