import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { prefixo } from './../registros/models/url';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userRole = '';

  constructor(public router: Router, public snackBar: MatSnackBar, public http: HttpClient) { }

  efetuarLogin(login, senha) {

    const params = new HttpParams()
    .set('login', login)
    .set('senha', senha);

    this.http.get(prefixo + 'funcionarios/login', {params}).subscribe(res => {
      console.log(res);
      const response: any = res;
      if (typeof(response) === 'object') {
        sessionStorage.setItem('documento', response[0].documento);
        sessionStorage.setItem('role', response[0].cargo);
        this.snackBar.open('Você entrou no app', 'Ok', {
          duration: 10000
        });
        this.router.navigate(['registro']);
      } else {
        this.snackBar.open(response, 'Ok', {
          duration: 10000
        });
      }
    }, error => {
      if (error) {
        this.snackBar.open('Sem resposta do servidor, tente novamente mais tarde.', 'Ok', {
          duration: 10000
        });
      }
    });
  }

  checkGuard() {
    if (sessionStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }
}
