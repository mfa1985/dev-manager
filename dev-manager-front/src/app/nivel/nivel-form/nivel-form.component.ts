import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Nivel } from 'src/app/models/nivel';
import { InteractionsService } from 'src/app/services/interactions.service';
import { NivelService } from 'src/app/services/nivel.service';

@Component({
  selector: 'app-nivel-form',
  templateUrl: './nivel-form.component.html',
  styleUrls: ['./nivel-form.component.css']
})
export class NivelFormComponent implements OnInit {

  public formulario!: FormGroup;
  public titulo!: string;
  public novo: boolean = true;
  private nivel!: Nivel;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private nivelService: NivelService,
    private interactionsService: InteractionsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.titulo = `Editando nível ${id}`;
        this.novo = false;
        this.nivelService.findOne(id).subscribe((nivel: Nivel) => {
          if (nivel) {
            this.nivel = nivel;
            this.formulario.patchValue(this.nivel);
          } else {
            this.interactionsService.toastStatus('warning', 'Atenção!', 'O nível que você está tentando editar não existe!', 6000);
          }
        })
      } else {
        this.titulo = `Inserindo nível`;
        this.novo = true;
      }
    });
  }

  initForm() {
    this.formulario = this.formBuilder.group({
      id: [0, [Validators.required]],
      nivel: ['', [Validators.required]]
    });
  }

  enviar() {
    // console.log(this.formulario.value);
    if (this.formulario.valid) {
      if (this.novo) {
        let novoNivel = this.formulario.value;
        this.nivelService.create(novoNivel).subscribe(
          () => {
            this.interactionsService.toastStatus('success', 'Sucesso!', 'Nível inserido com sucesso!!', 3000);
            this.router.navigate(["nivel"]);
          },
          error => {
            // console.log(error);
            this.interactionsService.toastStatus('error', 'Erro!', 'Não foi possível inserir o nível!! ' + this.nivelService.tratarErroNivel(error.error), 6000);
          }
        )
      } else {
        this.nivel = this.formulario.value;
        this.nivelService.update(this.nivel).subscribe(
          () => {
            this.interactionsService.toastStatus('success', 'Sucesso!', 'Nível inserido com sucesso!!', 3000);
            this.router.navigate(["nivel"]);
          },
          error => {
            // console.log(error);
            this.interactionsService.toastStatus('error', 'Erro!', 'Não foi possível inserir o nível!! ' + this.nivelService.tratarErroNivel(error.error), 6000);
          }
        )
      }
    } else {
      console.error(this.formulario)
    }
  }

}
