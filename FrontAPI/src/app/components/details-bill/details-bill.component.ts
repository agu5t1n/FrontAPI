import { DatePipe } from '@angular/common';
import { LocalizedString } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { BillService } from 'src/app/services/bill.service';
import { DetailsBillService } from 'src/app/services/details-bill.service';
@Component({
  selector: 'app-details-bill',
  templateUrl: './details-bill.component.html',
  styleUrls: ['./details-bill.component.css']
})
export class DetailsBillComponent implements OnInit {
  public BillByDate: string = ""
  public TotalByDate: string = ""
  public numbill: number = 0
  public pipe: any
  public Datenow: any
  public datetime: any
  public tabledate = false
  public DateS: any
  public message: string = ""
  public activemessage = false
  public DateMessage: string = ""

  constructor(private detailsservice: DetailsBillService, private billservice: BillService) { }

  ngOnInit(): void {
  }
  getData() {
    this.DateS = new Date()
    this.pipe = new DatePipe('en-US');
    this.Datenow = this.pipe.transform(this.DateS, 'YYYY-MM-dd');
    this.DateMessage = this.pipe.transform(this.DateS, 'dd-MM-YYYY');

    if (this.BillByDate <= this.Datenow && this.BillByDate != "" && this.BillByDate != null) {
      this.activemessage = false
      this.detailsservice.getBillByDate(this.BillByDate).subscribe(
        data => {
          console.log();
          
       if(data!=0){
        this.tabledate = true
        this.datetime = data
        this.BillByDate = ""
       }else{
        this.tabledate = false
        this.activemessage = true
        this.message = "No se encontraron ventas"
        this.BillByDate = ""
       }
          
        })
    } else if (this.TotalByDate <= this.Datenow && this.TotalByDate != "" && this.TotalByDate != null) {
      this.activemessage = false
      this.detailsservice.getTotalByDate(this.TotalByDate).subscribe(
        data => {
          this.tabledate = false
          this.activemessage = true
          this.DateMessage = this.pipe.transform(this.TotalByDate, 'dd-MM-YYYY');
          this.message = "El monto total del Dia " + this.DateMessage + " es de " + data
          this.TotalByDate = ""
        })
    }
    else {
      this.tabledate = false
      this.activemessage = true
      this.message = "Ingrese una fecha menor o igual a " + this.DateMessage
    }
  }
  getBillByDate() {
    this.DateS = new Date()
    this.pipe = new DatePipe('en-US');
    this.Datenow = this.pipe.transform(this.DateS, 'YYYY-MM-dd');
    this.DateMessage = this.pipe.transform(this.DateS, 'dd-MM-YYYY');

    if (this.TotalByDate <= this.Datenow && this.TotalByDate != "" && this.TotalByDate != null) {
      this.activemessage = false
      this.detailsservice.getBillByDate(this.TotalByDate).subscribe(
        data => {
          this.tabledate = true
          this.datetime = data
        })
    } else {
      this.tabledate = false
      this.activemessage = true
      this.message = "Ingrese una fecha menor o igual a " + this.DateMessage
    }
  }
  DeleteBill() {
    this.detailsservice.deleteBill(this.numbill).subscribe(
      data => {
        this.activemessage = true
        if (data == true) {
          this.message = "Se borro correctamente la factura"
        } else {
          this.message = "No se borro la factura. Verificar numero de factura"
        }
      }
    )
  }
}
