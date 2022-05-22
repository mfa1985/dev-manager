import { Desenvolvedor } from "./desenvolvedor";

export class Nivel {
    id?: number;
    nivel?: string;
    desenvolvedores?: Desenvolvedor;
  
    constructor(id?: number, nivel?: string, desenvolvedores?: Desenvolvedor) {
      this.id = id;
      this.nivel = nivel;
      this.desenvolvedores = desenvolvedores;
    }
  }
