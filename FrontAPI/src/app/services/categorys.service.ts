import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategorysService {

  constructor(private httpClient: HttpClient) { }
  getCategory(): Observable<any> {
    return this.httpClient.get("https://localhost:7138/Category/GetCategories")
  }
  savecategory(categoryDTO: any): Observable<any> {
    return this.httpClient.post<any>("https://localhost:7138/Category", categoryDTO)
  }
}

