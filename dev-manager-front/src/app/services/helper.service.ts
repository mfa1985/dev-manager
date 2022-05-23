import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  ordenador(dados: any, chave: any, tipo: any, ordenacao: any) {
    console.log("dados: " + dados);
    console.log("chave: " + chave);
    console.log("tipo: " + tipo);
    console.log("ordenacao: " + ordenacao);

    if (ordenacao == "asc") {
      if (tipo == "string") {
        dados = dados.sort((a: any, b: any) => {
          return a[chave].localeCompare(b[chave]);
        })
      } else {
        dados = dados.sort((a: any, b: any) => {
          return a[chave] - b[chave];
        })
      }
    } else {
      if (tipo == "string") {
        dados = dados.sort((a: any, b: any) => {
          return b[chave].localeCompare(a[chave]);
        })
      } else {
        dados = dados.sort((a: any, b: any) => {
          return b[chave] - a[chave];
        })
      }
    }
    return dados;
  }

}
