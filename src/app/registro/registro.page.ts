import { UsuariosService } from './../services/usuarios.service';
import { Usuario } from './../models/Usuario.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  nomeInput;
  emailInput;
  cpfInput;
  senhaInput;
  confirmaSenhaInput;

  usuario: Usuario = new Usuario();

  formRegistro = this.formBuilder.group({
    nome: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
    email: ['', Validators.compose([Validators.required ,Validators.email, Validators.minLength(6)])],
    cpf: ['', Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11)])],
    senha: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    confirmaSenha: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
  });

  mensagensErro = {
    nome: [
      {tipo: 'required', aviso: 'Insira um Nome!'},
      {tipo: 'minLength', aviso: 'O nome deve ter, no mínimo, 3 caracteres'}
    ],

    email: [
      {tipo: 'required', aviso: 'Insira um E-mail!'},
      {tipo: 'email', aviso: 'Insura um E-mail válido!'}
    ],

    cpf: [
      {tipo: 'required', aviso: 'Insira um CPF!'},
      {tipo: 'minLength', aviso: 'Insira um CPF válido!'},
      {tipo: 'maxLength', aviso: 'Insira um CPF válido!'}
    ],

    senha: [
      {tipo: 'required', aviso: 'Insira uma senha!'},
      {tipo: 'minLength', aviso: 'A senha deve conter, no mínimo, 6 caracteres!'}
    ],

    confirmaSenha: [
      {tipo: 'required', aviso: 'Insira uma senha!'},
      {tipo: 'minLength', aviso: 'A senha deve conter, no mínimo, 6 caracteres!'}
    ]
  };

  constructor(private formBuilder: FormBuilder, private usuarioService: UsuariosService, private route: Router) { }

  get nome()
  {
    return this.formRegistro.get('nome');
  }

  get email()
  {
    return this.formRegistro.get('email');
  }

  get cpf()
  {
    return this.formRegistro.get('cpf');
  }

  get senha()
  {
    return this.formRegistro.get('senha');
  }

  get confirmaSenha()
  {
    return this.formRegistro.get('confirmaSenha');
  }

  async limpar()
  {
    this.nomeInput = '';
    this.emailInput = '';
    this.cpfInput = '';
    this.senhaInput = '';
    this.confirmaSenhaInput = '';
  }

  ngOnInit() {
  }

  async salvar() {
    if(this.formRegistro.valid) {
      this.usuario.nome = this.formRegistro.get('nome').value;
      this.usuario.email = this.formRegistro.get('email').value;
      this.usuario.cpf = this.formRegistro.get('cpf').value;
      this.usuario.senha = this.formRegistro.get('senha').value;

      const id = await this.usuarioService.buscarId() as number;
      this.usuario.id = id;

      this.usuarioService.salvar(this.usuario);

      this.usuarioService.salvarId(id + 1);

      alert('Usuário Registrado');

      this.route.navigateByUrl('/login');
    } else{
      alert('Formulário Inválido!');
    }
  }

}
