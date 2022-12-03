import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastroProdutosPageRoutingModule } from './cadastro-produtos-routing.module';

import { CadastroProdutosPage } from './cadastro-produtos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    IonicModule,
    CadastroProdutosPageRoutingModule
  ],
  declarations: [CadastroProdutosPage]
})
export class CadastroProdutosPageModule {}
