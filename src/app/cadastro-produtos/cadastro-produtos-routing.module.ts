import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastroProdutosPage } from './cadastro-produtos.page';

const routes: Routes = [
  {
    path: '',
    component: CadastroProdutosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastroProdutosPageRoutingModule {}
