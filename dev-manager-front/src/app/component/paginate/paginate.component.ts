import { Component, Input, OnChanges, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { Paginate } from 'src/app/models/paginate';

class Page {
  page: number;
  params: string;
  constructor(page: number, params: string) {
    this.page = page;
    this.params = params;
  }
}

@Component({
  selector: 'app-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.css']
})
export class PaginateComponent implements OnChanges {

  @Input()  metaPaginate!: Paginate;
  @Output() emitParams = new EventEmitter();
  pages!: Page[];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.pages = [];
    for (let index = 0; index < this.metaPaginate.totalPages; index++) {
      let page = index + 1;
      this.pages.push(new Page(page, `limit=${this.metaPaginate.itemsPerPage}&page=${page}`))
    }
  }

  onEmitParams(params: string | symbol) {
    this.emitParams.emit(params);
  }

}
