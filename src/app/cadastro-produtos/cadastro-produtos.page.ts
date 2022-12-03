import { ProdutoService } from './../services/produto.service';
import { Produto } from './../models/Produto.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-produtos',
  templateUrl: './cadastro-produtos.page.html',
  styleUrls: ['./cadastro-produtos.page.scss'],
})
export class CadastroProdutosPage implements OnInit {

  nomeInput;
  descInput;
  valorInput;
  validadeInput;

  produto: Produto = new Produto();

  formProduto = this.formBuilder.group({
    nome: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
    descricao: ['', Validators.compose([Validators.required, Validators.maxLength(100)],)],
    valor: ['', Validators.compose([Validators.required])],
    validade: ['', Validators.compose([Validators.required])],
  });

  mensagensErro = {
    nome: [
      {tipo: 'required', aviso: 'Insira o nome do Produto!'},
      {tipo: 'minLength', aviso: 'O nome do Produto deve ter, no mínimo, 3 caracteres'}
    ],

    descricao: [
      {tipo: 'required', aviso: 'Insira a descrição do Produto!'},
      {tipo: 'maxLength', aviso: 'A descrição do Produto deve ter, no máximo, 100 caracteres'}
    ],

    valor: [
      {tipo: 'required', aviso: 'Insira o valor do Produto!'}
    ],

    validade: [
      {tipo: 'required', aviso: 'Insira a validade do Produto!'}
    ]
  };

  constructor(private formBuilder: FormBuilder, private produtoService: ProdutoService, private route: Router) { }

  get nome() {
    return this.formProduto.get('nome');
  }

  get descricao() {
    return this.formProduto.get('descricao');
  }

  get valor() {
    return this.formProduto.get('valor');
  }

  get validade() {
    return this.formProduto.get('validade');
  }

  ngOnInit() {
  }

  async salvar() {
    if(this.formProduto.valid) {
      this.produto.nome = this.formProduto.get('nome').value;
      this.produto.descricao = this.formProduto.get('descricao').value;
      this.produto.valor = this.formProduto.get('valor').value;
      this.produto.validade = this.formProduto.get('validade').value;

      const id = await this.produtoService.buscarId() as number;
      this.produto.id = id;

      this.produtoService.salvar(this.produto);
      this.produtoService.salvarId(id + 1);

      alert('Produto Cadastrado!');

      this.route.navigateByUrl('/tabs/tab2');
    } else {
      alert('Formulário Inválido!');
    }
  }

  async voltar() {
    this.limpar();
    this.route.navigateByUrl('tabs/tab2');
  }

  async limpar() {
    this.nomeInput = '';
    this.descInput = '';
    this.valorInput = '';
    this.validadeInput = '';
  }

}
