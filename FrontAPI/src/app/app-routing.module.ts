import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillComponent } from './components/bill/bill.component';
import { CategoryComponent } from './components/category/category.component';
import { DetailsBillComponent } from './components/details-bill/details-bill.component';
import { DetailsProductComponent } from './components/details-product/details-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
  { path: 'newProduct', component: ProductsComponent },
  { path: '', component: HomeComponent },
  { path: 'editProduct', component: EditProductComponent },
  { path: 'detailsProduct', component: DetailsProductComponent },
  { path: 'newBill', component: BillComponent },
  { path: 'detailsBill', component: DetailsBillComponent },
  { path: 'newcategory', component: CategoryComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
