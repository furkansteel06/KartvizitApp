import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardModalComponent } from './card-modal/card-modal.component';
import { CardsComponent } from './cards.component';

const routes: Routes = [
  { path: "", component: CardsComponent },
  { path: "", component: CardModalComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardsRoutingModule { }
