import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { Observable } from 'rxjs';
import { Dealernames } from '../interface/dealername';

@Injectable({
  providedIn: 'root'
})
export class DealerListServiceService {

  constructor(private http:HttpClient) { }
  getDealers():Observable<Dealernames[]>{
    return this.http.get("/getdealerdetails") as any
  }
}
