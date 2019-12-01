import { AdminService } from './../admin.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog, MatSnackBar } from '@angular/material';
import { EditRegistroComponent } from '../edit-registro/edit-registro.component';
import { DeleteRegistroComponent } from '../delete-registro/delete-registro.component';
import { prefixo } from 'src/app/registros/models/url';
import { jsonpCallbackContext } from '@angular/common/http/src/module';

@Component({
  selector: 'app-tabela-registros',
  templateUrl: './tabela-registros.component.html',
  styleUrls: ['./tabela-registros.component.css']
})

export class TabelaRegistrosComponent implements OnInit {

  json: any;
  displayedColumns: string[];
  // tslint:disable-next-line: no-use-before-declare
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  usuario: string;
  inicio: string;
  fim: string;
  periodo = false;

  constructor(public dialog: MatDialog, public adm: AdminService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    if (window.innerWidth <= 360) {
      this.displayedColumns = ['documento', 'nome', 'hora', 'acoes'];
    } else {
      this.displayedColumns  = ['documento', 'nome', 'tipo', 'hora', 'dia', 'acoes'];
    }
    this.buscarRegistros();
  }

  openEdit(rctps, rhora, rdia, rtipo): void {
    const dialogRef = this.dialog.open(EditRegistroComponent, {
      data: {ctps: rctps, hora: rhora, dia: rdia, tipo: rtipo}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.buscarRegistros();
    });
  }

  openDelete(rctps): void {
    const dialogRef = this.dialog.open(DeleteRegistroComponent, {
      data: {ctps: rctps}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.buscarRegistros();
    });
  }

  buscarRegistros() {
    this.adm.buscarRegistros(prefixo).subscribe(res => {
      console.log(res);
      this.json = res;
      if (typeof(this.json) === 'string') {
        this.snackBar.open(this.json, 'Ok', {
          duration: 10000
        });
      } else {
        this.json.map(item => item.data = (new Date(item.data).toLocaleDateString('pt-BR')));
        this.dataSource = new MatTableDataSource(this.json);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  buscarRegUsuario() {
    let endpoint;
    if (this.usuario) {
      if (this.inicio) {
        endpoint = 'registros/allbydocdate'
      } else {
        endpoint = 'registros/allbydoc';
      }
    } else {
      this.buscarRegistros();
      return true;
    }
    console.log(this.inicio);
    this.adm.buscarPorUsuario(prefixo, endpoint, this.usuario, this.inicio, this.fim, this.periodo).subscribe(res => {
      console.log(res);
      this.json = res;
      if (typeof(this.json) === 'string') {
        this.snackBar.open(this.json, 'Ok', {
          duration: 10000
        });
      } else {
        this.json.map(item => item.data = (new Date(item.data).toLocaleDateString('pt-BR')));
        this.dataSource = new MatTableDataSource(this.json);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

}
