import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormulaireFormationPage } from './formulaire-formation.page';

const routes: Routes = [
  {
    path: '',
    component: FormulaireFormationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormulaireFormationPageRoutingModule {}
