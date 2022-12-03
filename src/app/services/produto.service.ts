import { Produto } from './../models/Produto.model';
import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  listaProdutos: Produto[] = [];

  constructor(private storageService: StorageService) { }

  async salvar(produto: Produto) {
    await this.buscarTodos();
    this.listaProdutos[produto.id] = produto;
    this.storageService.set('produtos', this.listaProdutos);
  }

  async buscarUm(id: number) {
    await this.buscarTodos();
    return this.listaProdutos[id];
  }

  async buscarTodos() {
    this.listaProdutos = await this.storageService.get('produtos') as unknown as Produto[];

    if(!this.listaProdutos) {
      return this.listaProdutos = [];
    }

    return this.listaProdutos;
  }

  async deletar(id: number) {
    this.buscarTodos();
    this.listaProdutos.splice(id, 1);
    this.storageService.set('produtos', this.listaProdutos);
  }

  async salvarId(id: number) {
    await this.storageService.set('IdProduto', id);
  }

  async buscarId() {
    const id = await this.storageService.get('IdProduto');

    if(!id) {
      return 0;
    }

    return id;
  }
}
