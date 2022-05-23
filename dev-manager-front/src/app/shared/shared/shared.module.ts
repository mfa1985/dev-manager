import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginateComponent } from 'src/app/component/paginate/paginate.component';



@NgModule({
  declarations: [
    PaginateComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PaginateComponent
  ]
})
export class SharedModule { }
