import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormulaireFormationPageRoutingModule } from './formulaire-formation-routing.module';

import { FormulaireFormationPage } from './formulaire-formation.page';
import { RegistrationPageRoutingModule } from '../registration/registration-routing.module';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    IonicModule,
    FormulaireFormationPageRoutingModule
  ],
  declarations: [FormulaireFormationPage]
})
export class FormulaireFormationPageModule {}
