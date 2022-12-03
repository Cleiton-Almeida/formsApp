import { Usuario } from './../models/Usuario.model';
import { UsuariosService } from './../services/usuarios.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formLogin = this.formBuilder.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
    senha: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
  });

  mensagensErro = {
    email: [
      {tipo: 'required', aviso: 'Insira um E-mail!'},
      {tipo: 'email', aviso: 'Insira um E-mail válido!'}
    ],

    senha: [
      {tipo: 'required', aviso: 'Insira uma Senha!'},
      {tipo: 'minLength', aviso: 'A senha deve ter, no mínimo, 6 caracteres!'}
    ]
  };

  constructor(private formBuilder: FormBuilder, private route: Router, private usuarioService: UsuariosService) {}

  get email()
  {
    return this.formLogin.get('email');
  }

  get senha()
  {
    return this.formLogin.get('senha');
  }

  ngOnInit() {
  }

  async login() {
    if(this.formLogin.valid) {
      const email = this.formLogin.get('email').value;
      const senha = this.formLogin.get('senha').value;
      const usuario: Usuario = await this.usuarioService.login(email, senha) as null as Usuario;

      if(usuario) {
        this.route.navigateByUrl('/tabs/tab1');
      } else{
        alert('E-mail e/ou Senha inválidos!');
      }
    } else{
      alert('Formulário Inválido!');
    }
  }

  async telaRegistro() {
    this.route.navigateByUrl('/registro');
  }

}
