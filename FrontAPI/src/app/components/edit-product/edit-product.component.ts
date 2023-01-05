import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  public nameProduct: string = ""
  public activemessage = false
  public message: string = ""
  public category: string = ""
  public product: Product = new Product();
  constructor(private productservice: ProductsService) {
  }

  ngOnInit(): void {
  }

  getProduct() {
    if (this.nameProduct) {
      this.activemessage = false
      this.productservice.getproduct(this.nameProduct).subscribe(
        data => {
          if (data != null) {
            this.product.id = data.id
            this.product.Name = data.name
            this.product.Stock = data.stock
            this.product.Price = data.price
            this.product.IdCategory = data.idCategory
            this.category = data.category
          }
          else {
            this.activemessage = true
            this.message = "No se encontro el producto"
          }
        })
    } else {
      this.activemessage = true
      this.message = "Verifique nombre del Producto"
    }

  }
  submitproduct() {
    if (this.product.Name != "" && this.product.Stock != null && this.product.Price != null) {
      this.activemessage = false
      this.productservice.updateproduct(this.product).subscribe(
        data => {
          this.activemessage = true
          this.message = "Se actualizo correctamente el producto"
        })
    } else {
      this.activemessage = true
      this.message = "Verifique los datos"
    }
  }
}
