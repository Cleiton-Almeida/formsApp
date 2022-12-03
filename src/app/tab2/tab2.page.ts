import { Router } from '@angular/router';
import { Produto } from './../models/Produto.model';
import { ProdutoService } from './../services/produto.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  listaProdutos: Produto[] = [];

  constructor(private produtoService: ProdutoService, private route: Router) {}

  async buscarProdutos() {
    this.listaProdutos = await this.produtoService.buscarTodos();
  }

  async adicionar() {
    this.route.navigateByUrl('/cadastro-produtos');
  }

  async refresh() {
    window.location.reload();
  }

  ngOnInit(): void {

  }

  ionViewWillEnter() {
    this.buscarProdutos();
  }

}
