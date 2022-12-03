import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  // Cria variável para instanciar a classe Storage
  private _storage: Storage | null = null;

  // Cria a instancia do Storage
  constructor(private storage: Storage) {
    // Chama a função init
    this.init();
  }

  async init() {
    // Inicializa o banco de dados
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Se o Storage estiver instanciado, o set será executado
  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  public get(key: string) {
    return this._storage?.get(key);
  }

  async remove(key: string) {
    await this._storage.remove(key);
  }
}
