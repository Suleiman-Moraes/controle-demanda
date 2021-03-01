import { Injectable } from '@angular/core';
import { UserLogado } from '../models/user-logado.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  public get currentUserValue(): UserLogado {
    return {};
  }
}
