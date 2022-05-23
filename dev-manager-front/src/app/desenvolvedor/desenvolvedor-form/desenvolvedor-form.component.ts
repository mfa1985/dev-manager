import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Desenvolvedor } from 'src/app/models/desenvolvedor';
import { Nivel } from 'src/app/models/nivel';
import { DesenvolvedorService } from 'src/app/services/desenvolvedor.service';
import { InteractionsService } from 'src/app/services/interactions.service';
import { NivelService } from 'src/app/services/nivel.service';

@Component({
  selector: 'app-desenvolvedor-form',
  templateUrl: './desenvolvedor-form.component.html',
  styleUrls: ['./desenvolvedor-form.component.css']
})
export class DesenvolvedorFormComponent implements OnInit {

  formulario!: FormGroup;
  titulo!: string;
  novo: boolean = true;
  private dev!: Desenvolvedor;
  niveis: Nivel[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private devService: DesenvolvedorService,
    private nivelService: NivelService,
    private interactionsService: InteractionsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm();
    this.buscarNiveis();
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.titulo = `Editando desenvolvedor ${id}`;
        this.novo = false;
        this.devService.findOne(id).subscribe((dev: Desenvolvedor) => {
          if (dev) {
            this.dev = dev;
            this.formulario.patchValue(this.dev);
            this.formulario.controls['nivel'].setValue(this.dev.nivel?.id);
          } else {
            this.interactionsService.toastStatus('warning', 'Atenção!', 'O desenvolvedor que você está tentando editar não existe!', 6000);
          }
        })
      } else {
        this.titulo = `Inserindo desenvolvedor`;
        this.novo = true;
      }
    });
  }

  buscarNiveis(): void {
    this.nivelService.findAll().subscribe(
      data => {
        this.niveis = (<any>data).items;
        console.log("niveis", this.niveis);
      },
      error => {
        this.interactionsService.toastStatus('error', 'Erro!', 'Não foi possível buscar os resgistros!! ', 6000);
      }
    );
  }

  initForm() {
    this.formulario = this.formBuilder.group({
      id: [0, [Validators.required]],
      nivel: ["", Validators.required],
      nome: ["", Validators.required],
      sexo: ["", Validators.required],
      datanascimento: ["", Validators.required],
      hobby: [""]
    });
  }

  enviar() {
    if (this.formulario.valid) {
      if (this.novo) {
        let novoNivel = this.formulario.value;
        novoNivel.nivel = +this.formulario.value.nivel;
        novoNivel.idade = this.calcularIdade(this.formulario.value.datanascimento);
        this.devService.create(novoNivel).subscribe(
          () => {
            this.interactionsService.toastStatus('success', 'Sucesso!', 'Desenvolvedor inserido com sucesso!!', 3000);
            this.router.navigate(["desenvolvedor"]);
          },
          error => {
            console.log(error);
            this.interactionsService.toastStatus('error', 'Erro!', 'Não foi possível inserir o nível!! ' + this.devService.tratarErroDev(error.error), 6000);
          }
        )
      } else {
        this.dev = this.formulario.value;
        this.dev.idade = this.calcularIdade(this.formulario.value.datanascimento);
        this.devService.update(this.dev).subscribe(
          () => {
            this.interactionsService.toastStatus('success', 'Sucesso!', 'Desenvolvedor inserido com sucesso!!', 3000);
            this.router.navigate(["desenvolvedor"]);
          },
          error => {
            // console.log(error);
            this.interactionsService.toastStatus('error', 'Erro!', 'Não foi possível inserir o nível!! ' + this.devService.tratarErroDev(error.error), 6000);
          }
        )
      }
    } else {
      console.error(this.formulario)
      this.interactionsService.toastStatus('error', 'Erro!', 'Preencha corretamente todos os campos! ', 6000);
    }
  }

  calcularIdade(data: string){
    let idade = 0;
    let dataNascimento = new Date(data);
    if(dataNascimento.getFullYear() > 1900) {
      let dataAtual = new Date();
      let anoAtual = dataAtual.getFullYear();
      let aniversario = new Date(anoAtual, dataNascimento.getMonth(), dataNascimento.getDate());
      idade = anoAtual - dataNascimento.getFullYear();
      if(aniversario > dataAtual) {
        idade--;
      }
    }
    return idade;
  }

  valueNivel(nivel: Nivel){
    return nivel.id?.toString();
  }

}
