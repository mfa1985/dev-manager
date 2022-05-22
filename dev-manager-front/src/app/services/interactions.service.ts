import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class InteractionsService {

  constructor(private toastr: ToastrService) { }

  toastStatus(status = '', titulo: string = '', texto: string = '', timer: number = 5000) {
    switch (status) {
      case "success":
        this.toastr.success(texto, titulo, { timeOut: timer, positionClass: "toast-bottom-right" });
        break;
      case "warning":
        this.toastr.warning(texto, titulo, { timeOut: timer, positionClass: "toast-bottom-right" });
        break;
      case "error":
        this.toastr.error(texto, titulo, { timeOut: timer, positionClass: "toast-bottom-right" });
        break;
      default:
        this.toastr.info(texto, titulo, { timeOut: timer, positionClass: "toast-bottom-right" });
        break;
    }
  }

  confirmarSimNao(titulo: string, mensagem: string, callbackConfirmYes?: any, callbackConfirmNo?: any) {
    Swal.fire({
      title: titulo,
      text: mensagem,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.value) {
        callbackConfirmYes();
      } else {
        callbackConfirmNo();
      }
    });
    //   Swal.fire({
    //     title: titulo,
    //     text: mensagem,
    //     type: 'question',
    //     showCancelButton: true,
    //     confirmButtonColor: '#3085d6',
    //     cancelButtonColor: '#d33',
    //     confirmButtonText: 'Continuar',
    //     cancelButtonText: 'Cancelar',
    //     reverseButtons: true
    //   }).then((result) => {
    //     if (result.value) {
    //       callbackConfirmYes();
    //     } else {
    //       callbackConfirmNo();
    //     }
    //   });
  }
}
