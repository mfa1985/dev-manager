import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Desenvolvedor } from '../models/desenvolvedor';

@Injectable({
  providedIn: 'root'
})
export class DesenvolvedorService {

  private api = `${environment.api}/desenvolvedor`;

  constructor(
    private httpClient: HttpClient
  ) { }

  public findAll(): Observable<Desenvolvedor[]> {
    return this.httpClient.get<Desenvolvedor[]>(`${this.api}`);
  }

  public findOne(id: number): Observable<Desenvolvedor> {
    return this.httpClient.get<Desenvolvedor>(`${this.api}/${id}`);
  }

  public create(dev: Desenvolvedor): Observable<Desenvolvedor> {
    return this.httpClient.post<Desenvolvedor>(`${this.api}`, dev);
  }

  public update(dev: Desenvolvedor): Observable<Desenvolvedor> {
    return this.httpClient.put<Desenvolvedor>(`${this.api}/${dev.id}`, dev);
  }

  public remove(id: number): Observable<Desenvolvedor> {
    return this.httpClient.delete<Desenvolvedor>(`${this.api}/${id}`);
  }

  tratarErroDev(error: any){
    let res = "";
    if ( error.code! == "ER_DUP_ENTRY" ) {
      res = "Já existe um desenvolvedor cadastrado com esse valor, por favor escolha outro!";
    }
    return res;
  }

}
