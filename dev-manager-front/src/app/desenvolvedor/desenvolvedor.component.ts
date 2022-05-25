import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Desenvolvedor } from '../models/desenvolvedor';
import { Nivel } from '../models/nivel';
import { DesenvolvedorService } from '../services/desenvolvedor.service';
import { HelperService } from '../services/helper.service';
import { InteractionsService } from '../services/interactions.service';
import { Paginate } from '../models/paginate';

@Component({
  selector: 'app-desenvolvedor',
  templateUrl: './desenvolvedor.component.html',
  styleUrls: ['./desenvolvedor.component.css']
})
export class DesenvolvedorComponent implements OnInit {

  devs: Desenvolvedor[] | undefined;
  camposOrd = ["id","nome","nivel","datanascimento","idade","sexo","hobby"];
  tipoCampoOrd = ["number","string","string","string","number","string","string"];
  sequenciaOrd = ["asc","asc","asc","asc","asc","asc","asc"];
  lastParameters: string | undefined;
  paginate: Paginate | undefined;
  filtro: string | undefined;

  constructor(
    private devService: DesenvolvedorService,
    private interactionsService: InteractionsService,
    private router: Router,
    private helper: HelperService
  ) { }

  ngOnInit(): void {
    this.buscarDevs();
  }

  ordenar(index: number) {
    this.helper.ordenador(this.devs, this.camposOrd[index], this.tipoCampoOrd[index], this.sequenciaOrd[index]);
    this.sequenciaOrd[index] = (this.sequenciaOrd[index] == "asc" ? "desc" : "asc");
  }

  async buscarDevs(queryParameters = 'limit=5') {
    this.lastParameters = queryParameters;
    this.devService.findAll(queryParameters).subscribe(
      data => {
        this.devs = (<any>data).items;
        console.log(this.devs);
        this.paginate = Object.assign((<any>data).meta);
      },
      error => {
        this.interactionsService.toastStatus('error', 'Erro!', 'Não foi possível buscar os resgistros!! ', 6000);
      }
    );
  }

  apagar(dev: Desenvolvedor) {
    // console.log(`Apagar id ${dev.id}`);
    this.interactionsService.confirmarSimNao("Atenção", `Deseja realmente excluir o item ${dev.id} - ${dev.nome} ?`, () => this.excluir(dev.id!), () => null)
  }

  excluir(id:number){
    // console.log(`Excluir id ${id}`);
    this.devService.remove(id).subscribe(
      data => {
        this.interactionsService.toastStatus('success', 'Sucesso!', 'Registro removido com sucesso!!', 3000);
        this.buscarDevs();
      },
      error => {
        console.log(error);
        this.interactionsService.toastStatus('error', 'Erro!', 'Não foi possível remover o resgistro!! ' + error.error, 6000);
      }
    )
  }

  inserirDev(): void{
    console.log("inserir");
    this.router.navigate(["desenvolvedor/inserir"]);
  }

  editarDev(id:number): void{
    console.log(`Editar id ${id}`);
    this.router.navigate([`desenvolvedor/alterar/${id}`]);
  }

  filtrar(){
    this.lastParameters = `limit=10&busca=${this.filtro}`
    this.buscarDevs(this.lastParameters)
  }

  labelNivel(nivel: Nivel){
    return nivel.id + " - " + nivel.nivel!;
  }

}
