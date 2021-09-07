// app.component.ts
import { Component } from '@angular/core';
import { trigger, transition, state, animate, style } from '@angular/animations';

import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { ChatService, Message } from './chat/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css','./eyes.scss']
})
export class AppComponent {
  title = 'Chatbot';
  closeResult: string;
  show:boolean=false;
  modalOptions:NgbModalOptions;

  constructor(
    private modalService: NgbModal,private Chat:ChatService
  ){
    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
    }
  }
  
  open(content) {
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  show_hide()
  {
   if(this.show==true)
   {
     this.show=false;
     this.Chat.clear_msg();
   }
   else
   {
     this.show=true;
   }
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
