import { Component, OnInit } from '@angular/core';
import { CategorysService } from 'src/app/services/categorys.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.css']
})
export class DetailsProductComponent implements OnInit {
  public Category: any
  public CategoryFind: any
  public CategoryStock: any
  public detailCategory: any
  public activetable = false
  public activemessage = false
  public message: string = ""
  constructor(private productservice: ProductsService, private categoryservice: CategorysService) { }

  ngOnInit(): void {
    this.categoryservice.getCategory().subscribe(
      data => {
        this.Category = data
      })
  }
  getProductByCategory() {
    this.productservice.getProductByCategory(this.CategoryFind).subscribe(
      data => {
        console.log();

        if (data != "") {
          this.activetable = true
          this.activemessage = false
          this.detailCategory = data
        } else {
          this.activemessage = true
          this.message = "Seleccione una Categoria"
        }
      })
  }
  getTotal() {
    this.productservice.getTotal().subscribe(
      data => {
        this.activetable = false
        this.activemessage = true
        this.message = "El total del stock es de: " + data
      })
  }
  getStockTotalCategory() {
    if (this.CategoryStock != null) {
      this.productservice.getStockTotalCategory(this.CategoryStock).subscribe(
        data => {
          this.activetable = false
          this.activemessage = true
          this.message = "El stock de la categoria " + this.CategoryStock + " es de: " + data
        })
    } else {
      this.activemessage = true
      this.activetable = false
      this.message = "Seleccione una Categoria"
    }
  }
}
