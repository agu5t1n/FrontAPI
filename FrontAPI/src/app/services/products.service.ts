import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/Product';
@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  constructor(private httpClient: HttpClient) { }

  getproduct(name: string): Observable<any> {
    let params = new HttpParams().set('name', name)
    return this.httpClient.get("https://localhost:7138/Product/GetProduct", { params: params })
  }
  getProductByCategory(name: string): Observable<any> {
    let params = new HttpParams().set('name', name)
    return this.httpClient.get("https://localhost:7138/Product/ProductByCategory", { params: params })
  }
  getTotal(): Observable<any> {
    return this.httpClient.get("https://localhost:7138/Product/TotalStock")
  }
  saveproduct(Product: Product): Observable<Product> {
    return this.httpClient.post<Product>("https://localhost:7138/Product", Product)
  }
  updateproduct(Product: Product): Observable<Product> {
    return this.httpClient.put<Product>("https://localhost:7138/Product/Update", Product)
  }
  getStockTotalCategory(name: string): Observable<any> {
    let params = new HttpParams().set('name', name)
    return this.httpClient.get("https://localhost:7138/Product/StockByCategory", { params: params })
  }
}
