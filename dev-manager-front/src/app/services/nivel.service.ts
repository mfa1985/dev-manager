import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Nivel } from '../models/nivel';

@Injectable({
  providedIn: 'root'
})
export class NivelService {

  private api = `${environment.api}/nivel`;

  constructor(
    private httpClient: HttpClient
  ) { }

  public findAll(): Observable<Nivel[]> {
    return this.httpClient.get<Nivel[]>(`${this.api}`);
  }

  public findOne(id: number): Observable<Nivel> {
    return this.httpClient.get<Nivel>(`${this.api}/${id}`);
  }

  public create(nivel: Nivel): Observable<Nivel> {
    return this.httpClient.post<Nivel>(`${this.api}`, nivel);
  }

  public update(nivel: Nivel): Observable<Nivel> {
    return this.httpClient.put<Nivel>(`${this.api}/${nivel.id}`, nivel);
  }

  public remove(id: number): Observable<Nivel> {
    return this.httpClient.delete<Nivel>(`${this.api}/${id}`);
  }

  tratarErroNivel(error: any){
    let res = "";
    if ( error.code! == "ER_DUP_ENTRY" ) {
      res = "Já existe um nível cadastrado com esse valor, por favor escolha outro!";
    }
    return res;
  }

}
