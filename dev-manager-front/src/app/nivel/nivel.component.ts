import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Nivel } from '../models/nivel';
import { InteractionsService } from '../services/interactions.service';
import { NivelService } from '../services/nivel.service';

@Component({
  selector: 'app-nivel',
  templateUrl: './nivel.component.html',
  styleUrls: ['./nivel.component.css']
})
export class NivelComponent implements OnInit {

  niveis: Nivel[] = [];

  constructor(
    private nivelService: NivelService,
    private interactionsService: InteractionsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buscarNiveis();
  }

  buscarNiveis(): void {
    this.nivelService.findAll().subscribe(
      data => {
        this.niveis = data;
        console.log("niveis", this.niveis);
      },
      error => {
        this.interactionsService.toastStatus('error', 'Erro!', 'Não foi possível buscar os resgistros!! ', 6000);
      }
    );
  }

  apagar(nivel: Nivel) {
    // console.log(`Apagar id ${nivel.id}`);
    this.interactionsService.confirmarSimNao("Atenção", `Deseja realmente excluir o item ${nivel.id} - ${nivel.nivel} ?`, () => this.excluir(nivel.id!), () => null)
  }

  excluir(id:number){
    // console.log(`Excluir id ${id}`);
    this.nivelService.remove(id).subscribe(
      data => {
        this.interactionsService.toastStatus('success', 'Sucesso!', 'Registro removido com sucesso!!', 3000);
        this.buscarNiveis();
      },
      error => {
        console.log(error);
        this.interactionsService.toastStatus('error', 'Erro!', 'Não foi possível remover o resgistro!! ' + error.error, 6000);
      }
    )
  }

  inserirNivel(): void{
    console.log("inserir");
    this.router.navigate(["nivel/inserir"]);
  }

  editarNivel(id:number): void{
    console.log(`Editar id ${id}`);
    this.router.navigate([`nivel/alterar/${id}`]);
  }

}
