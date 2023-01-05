import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/Product';
import { CategorysService } from 'src/app/services/categorys.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public activemessage = false
  public message: string = ""
  register_product: FormGroup;
  public product: Product = new Product();
  public Category: any
  public activeCategory = false

  constructor(private productservice: ProductsService, private categoryservice: CategorysService) {
    this.register_product = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.nullValidator]),
      stock: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      idCategory: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
    this.categoryservice.getCategory().subscribe(
      data => {
        if (data != "") {
          this.Category = data
        } else {
          this.activeCategory = true
          this.message = "Debe crear por lo menos una categoria"
        }
      })
  }
  submitproduct() {
    this.product = {
      id: 0,
      Name: this.register_product.value.name,
      Stock: this.register_product.value.stock,
      Price: this.register_product.value.price,
      IdCategory: this.register_product.value.idCategory,
    }
    if (this.product.Name != "" && this.product.Stock != 0 && this.product.Price != 0 && this.product.Stock != null && this.product.Price != null && this.product.IdCategory != 0) {
      this.activemessage = false
      this.productservice.saveproduct(this.product).subscribe(
        data => {
          this.activemessage = true
          this.message = "Se guardo correctamente el producto"
        })
    } else {
      this.activemessage = true
      this.message = "Verifique los datos"
    }
  }

}