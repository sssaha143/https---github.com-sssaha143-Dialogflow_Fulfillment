import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  // {
  //   path: 'home',component:HomeComponent
    
  // },{
  //   path: 'contact',component:ContactComponent
    
  // },
  // {
  //   path: 'dialog',component:ChatDialogComponent
  // },
  // {
  //   path: 'dialog',
  //   loadChildren: './chat/chat.module#Chat'
    
  // },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
