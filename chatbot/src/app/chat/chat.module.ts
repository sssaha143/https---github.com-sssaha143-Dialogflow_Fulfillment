import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from './chat.service';
import { TicketRoutingModule } from './chat-routing.module';
import { ChatDialogTestComponent } from './chat-dialog-test/chat-dialog-test.component';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
 
  providers: [ChatService]
})
export class Chat { }