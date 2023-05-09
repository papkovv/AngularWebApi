import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl = "https://localhost:44354/api"
  constructor(private http:HttpClient) { }

  addForm(val:any):Observable<any[]>{
    return this.http.post<any>(this.APIUrl+'/Form', val);
  }
}

