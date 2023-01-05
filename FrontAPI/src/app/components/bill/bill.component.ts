import { Component, OnInit } from '@angular/core';

import { Order } from 'src/app/models/Order';
import { Product } from 'src/app/models/Product';
import { BillService } from 'src/app/services/bill.service';
import { CategorysService } from 'src/app/services/categorys.service';
import { DetailsBillService } from 'src/app/services/details-bill.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {
  public numbill: number = 0
  public idbill: number = 0
  public activetable = false
  public activeproduct = false
  public stock: number = 0
  public price: number = 0
  public idcategory: number = 0
  public activebill = false
  public activebutton = false
  public message: string = ""
  public activemessage = false
  public activebuttonsave = false
  public client: string = ""
  public numberclient: number = 0
  public documentclient: string = ""
  public productname: string = ""
  public Category: any
  public bill: any
  public CategoryFind: any
  public products: any
  public productselect: any
  public productid = 0
  public priceUnit: number = 0
  public amount: number = 0
  public totalProduct: number = 0
  public totalBill: number = 0
  public orderArr: Order[] = []
  public Order: Order = new Order
  public productarr: Product[] = []
  public Product: Product = new Product
  constructor(private billservice: BillService, private categoryservice: CategorysService, private productservice: ProductsService, private detailbillservice: DetailsBillService) {
  }

  ngOnInit(): void {
    this.categoryservice.getCategory().subscribe(
      data => {
        this.Category = data
      })
    this.billservice.getBill().subscribe(
      data => {

        this.numbill = data.numBill
        if (this.numbill == 0) {
          this.numbill = 1000
        }
        this.idbill = data.id
      })
  }
  getproductByCategory() {
    this.productservice.getProductByCategory(this.CategoryFind).subscribe(
      data => {
        this.products = data
      }
    )
  }
  getproduct() {
    this.productservice.getproduct(this.productselect).subscribe(
      data => {
        this.priceUnit = data.price
        this.productid = data.id
        this.productname = data.name
        this.stock = data.stock
        this.price = data.price
        this.idcategory = data.idCategory
      }
    )
  }
  TotalPrice() {
    this.totalProduct = 0
    this.totalProduct = this.priceUnit * this.amount

  }
  AddProducts() {
    if (this.CategoryFind != null && this.productselect != null && this.amount != null && this.amount > 0) {


      if (this.stock >= this.amount) {
        this.activemessage = false

        this.Order = {
          NumBill: this.numbill,
          UnitPrice: this.priceUnit,
          Amount: this.amount,
          Subtotal: this.totalProduct,
          IdBill: this.idbill,
          IdProduct: this.productid,
          Name: this.productname
        }
        this.orderArr.push(this.Order)
        this.stock -= this.amount
        this.Product = {
          id: this.productid,
          Name: this.productname,
          Stock: this.stock,
          Price: this.price,
          IdCategory: this.idcategory
        }
        this.productarr.push(this.Product)
        this.activetable = true
        this.totalProduct = this.priceUnit * this.amount
        this.totalBill = this.totalBill + this.totalProduct
        this.activebutton = true
        this.amount = 0
      } else {
        this.activemessage = true
        this.message = "Modifique la cantidad ya que supera el Stock, El stock restante es de " + this.stock
      }
    } else {
      this.activemessage = true
      this.message = "Verifique los datos cargados"
    }
  }
  createproduct() {
    if (this.client != null && this.documentclient != null && this.client != "" && this.documentclient != "" && this.totalBill >= 0) {
      this.activemessage = false
      this.activeproduct = true
      this.activebill = true
    }
    else {
      this.activemessage = true
      this.message = "Verifique los datos cargados"
    }
  }
  saveBill() {
    this.bill = {
      Client: this.client,
      DocumentClient: this.documentclient,
      NumberClient: this.numberclient,
      Total: this.totalBill
    }
    this.billservice.saveBill(this.bill).subscribe(
      data => {
        this.idbill = data.id
        this.numbill = data.numBill
        this.orderArr.forEach(element => {
          element.IdBill = this.idbill
          this.detailbillservice.saveDetail(element).subscribe(
            data => {

              this.productarr.forEach(element => {
                this.productservice.updateproduct(element).subscribe(
                  data => {
                    this.activemessage = true
                    this.message = "Se cargo correctamente la factura Numero: " + this.numbill
                    this.activeproduct = false
                    this.activebill = true
                    this.activebuttonsave = true
                  })
              })
            })
        });
      })

  }
}