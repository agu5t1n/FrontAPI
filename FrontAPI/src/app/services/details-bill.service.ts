import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/Order';

@Injectable({
  providedIn: 'root'
})
export class DetailsBillService {

  constructor(private httpClient: HttpClient) { }
  getBillByDate(date: string): Observable<any> {
    let params = new HttpParams().set('Datetime', date)
    return this.httpClient.get("https://localhost:7138/Bill/FindByDate", { params: params })
  }
  getTotalByDate(date: string): Observable<any> {
    let params = new HttpParams().set('Datetime', date)
    return this.httpClient.get("https://localhost:7138/Bill/TotalByDate", { params: params })
  }
  saveDetail(Order: Order): Observable<Order> {
    return this.httpClient.post<Order>("https://localhost:7138/Order", Order)
  }
  deleteBill(numbill: number): Observable<any> {
    let params = new HttpParams().set('numbill', numbill)
    return this.httpClient.delete<any>("https://localhost:7138/Order/Delete", { params: params })
  }
}
