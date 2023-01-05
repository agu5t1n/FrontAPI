import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private httpClient: HttpClient) { }
  getBill(): Observable<any> {
    return this.httpClient.get("https://localhost:7138/Bill/Bill")
  }
  saveBill(any: any): Observable<any> {
    return this.httpClient.post<any>("https://localhost:7138/Bill", any)
  }
  deleteBill(numbill: number): Observable<any> {
    let params = new HttpParams().set('numbill', numbill)
    return this.httpClient.delete<any>("https://localhost:7138/Bill/Delete", { params: params })
  }
}