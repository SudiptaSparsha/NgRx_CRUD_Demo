import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Associates } from '../store/model/associate.model';

@Injectable({
  providedIn: 'root'
})
export class AssociateService {

  baseUrl = 'http://localhost:3000/associate';

  constructor(private http : HttpClient) { }

  getAll(){
    return this.http.get<Associates[]>(this.baseUrl);
  }

  getById(id : number){
    return this.http.get<Associates>(this.baseUrl + '/' + id);
  }

  delete(id : number){
    return this.http.delete(this.baseUrl + '/' + id);
  }

  update(data : Associates){
    return this.http.put<Associates>(this.baseUrl + '/' + data.id, data);
  }

  create(data : Associates){
    return this.http.post<Associates>(this.baseUrl, data);
  }
}
