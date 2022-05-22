import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesenvolvedorFormComponent } from './desenvolvedor/desenvolvedor-form/desenvolvedor-form.component';
import { DesenvolvedorComponent } from './desenvolvedor/desenvolvedor.component';
import { NivelFormComponent } from './nivel/nivel-form/nivel-form.component';
import { NivelComponent } from './nivel/nivel.component';

const routes: Routes = [
  // {path: '', component: ListaProductoComponent},
  {path: 'nivel', component: NivelComponent},
  {path: 'nivel/inserir', component: NivelFormComponent},
  {path: 'nivel/editar/:id', component: NivelFormComponent},
  {path: 'desenvolvedor', component: DesenvolvedorComponent},
  {path: 'desenvolvedor/inserir', component: DesenvolvedorFormComponent},
  {path: 'desenvolvedor/editar/:id', component: DesenvolvedorFormComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
