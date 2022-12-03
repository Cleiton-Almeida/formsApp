import { Usuario } from './../models/Usuario.model';
import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  listaUsuarios: Usuario[] = [];

  constructor(private storageService: StorageService) { }

  async login(email: string, senha: string) {
    await this.buscarTodos();
    let usuario: Usuario;
    this.listaUsuarios.filter(item => {
      if (item.email.toLocaleLowerCase() == email.toLocaleLowerCase()) {
        usuario = item;
      }
    });

    if(usuario?.senha === senha) {
      return usuario;
    }
    return null;
  }

  async salvar(usuario: Usuario) {
    await this.buscarTodos();
    this.listaUsuarios[usuario.id] = usuario;
    this.storageService.set('usuarios', this.listaUsuarios);
  }

  async buscarUm(id: number) {
    await this.buscarTodos();
    return this.listaUsuarios[id];
  }

  async buscarTodos() {
    this.listaUsuarios = await this.storageService.get('usuarios') as unknown as Usuario[];

    if (!this.listaUsuarios) {
      this.listaUsuarios = [];
    }

    return this.listaUsuarios;
  }

  async deletar(id: number) {
    await this.buscarTodos();
    this.listaUsuarios.splice(id, 1);
    this.storageService.set('usuarios', this.listaUsuarios);
  }

  async salvarId(id: number) {
    await this.storageService.set('IdUsuario', id);
  }

  async buscarId() {
    const id = await this.storageService.get('idUsuario');

    if(!id) {
      return 0;
    }

    return id;
  }


}
