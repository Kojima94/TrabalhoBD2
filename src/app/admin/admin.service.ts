import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(public http: HttpClient) { }

  buscarUsuarios(prefixo) {
    return this.http.get(prefixo + 'funcionarios/all');
  }

  buscarExternos(prefixo) {
    return this.http.get(prefixo + 'externos/all');
  }

  buscarUsuarioPorParam(prefixo, ctps) {
    let params = new HttpParams();
    if (ctps) {
      params = params.set('documento', ctps);
    }
    return this.http.get(prefixo + 'funcionarios/bydoc', {params});
  }

  buscarRegistros(prefixo) {
    const params = new HttpParams().set('data', new Date().toLocaleDateString('pt-BR'));
    return this.http.get(prefixo + 'registros/allbydate', {params});
  }

  atualizarRegistro(prefixo, json) {
    const params = new HttpParams().append('ctps', json.ctps)
    .append('hora', json.hora).append('data', json.data)
    .append('tipo', json.tipo);
    return this.http.patch(prefixo + 'registro', params);
  }

  apagarRegistro(prefixo, ctps) {
    const params = new HttpParams().append('ctps', ctps);
    return this.http.delete(prefixo + 'registro', {params});
  }

  buscarExtras(prefixo) {
    const params = new HttpParams().set('dataini', new Date().toLocaleDateString('pt-BR'));
    return this.http.get(prefixo + 'extras/allbydate', {params});
  }

  atualizarUsuario(prefixo, json) {
    let params = new HttpParams().append('documento', json.ctps)
    .append('nome', json.nome)
    .append('login', json.login).append('role', json.role)
    .append('cargahr', json.cargahr);
    if (json.senha !== '') {
      params = params.append('senha', json.senha);
    }
    return this.http.post(prefixo + 'funcionarios/update', params);
  }

  apagarUsuario(prefixo, ctps) {
    const params = new HttpParams().append('documento', ctps);
    return this.http.post(prefixo + 'funcionarios/delete', params);
  }

  apagarExterno(prefixo, documento) {
    const params = new HttpParams().append('documento', documento);
    return this.http.post(prefixo + 'externos/delete', params);
  }

  addUsuario(prefixo, form) {
    const params = new HttpParams()
    .append('nome', form.nomeInput).append('documento', form.ctpsInput)
    .append('login', form.usuarioInput).append('senha', form.senhaInput)
    .append('role', form.roleSelect).append('cargahr', form.cargaHrInput);

    return this.http.post(prefixo + 'funcionarios/inserir', params);
  }

  addExterno(prefixo, form) {
    const params = new HttpParams()
    .append('nome', form.nomeInput).append('documento', form.documentoInput)
    .append('contato', form.contatoInput);

    return this.http.post(prefixo + 'externos/inserir', params);
  }

  buscarPorUsuario(prefixo, endpoint, usuario, inicio, fim, periodo) {
    let params = new HttpParams();
    if (usuario) {
      params = params.set('documento', usuario);
    }
    if (inicio) {
      params = params.set('data', inicio);
    }
    return this.http.get(prefixo + endpoint, {params});
  }

  reorderString(str) {
    const dd = str.slice(0, 3);
    const mm = str.slice(3, 6);
    const aa = str.slice(6, 10);

    return mm + dd + aa;
  }

}
