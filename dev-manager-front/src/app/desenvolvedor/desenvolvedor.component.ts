import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Desenvolvedor } from '../models/desenvolvedor';
import { DesenvolvedorService } from '../services/desenvolvedor.service';
import { InteractionsService } from '../services/interactions.service';

@Component({
  selector: 'app-desenvolvedor',
  templateUrl: './desenvolvedor.component.html',
  styleUrls: ['./desenvolvedor.component.css']
})
export class DesenvolvedorComponent implements OnInit {

  devs: Desenvolvedor[] = [];

  constructor(
    private devService: DesenvolvedorService,
    private interactionsService: InteractionsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buscarDevs();
  }

  buscarDevs(): void {
    this.devService.findAll().subscribe(
      data => {
        this.devs = data;
        console.log("devs", this.devs);
      },
      error => {
        this.interactionsService.toastStatus('error', 'Erro!', 'Não foi possível buscar os resgistros!! ', 6000);
      }
    );
  }

  apagar(dev: Desenvolvedor) {
    // console.log(`Apagar id ${dev.id}`);
    this.interactionsService.confirmarSimNao("Atenção", `Deseja realmente excluir o item ${dev.id} - ${dev.nivel} ?`, () => this.excluir(dev.id!), () => null)
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

}
