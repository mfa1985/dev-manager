import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { DesenvolvedorComponent } from './desenvolvedor/desenvolvedor.component';
import { NivelComponent } from './nivel/nivel.component';
import { NivelFormComponent } from './nivel/nivel-form/nivel-form.component';
import { DesenvolvedorFormComponent } from './desenvolvedor/desenvolvedor-form/desenvolvedor-form.component';
import { PaginateComponent } from './component/paginate/paginate.component';

@NgModule({
  declarations: [
    AppComponent,
    DesenvolvedorComponent,
    NivelComponent,
    NivelFormComponent,
    DesenvolvedorFormComponent,
    PaginateComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
