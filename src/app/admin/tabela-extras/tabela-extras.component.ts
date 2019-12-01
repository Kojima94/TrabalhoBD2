import { AdminService } from './../admin.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog, MatSnackBar } from '@angular/material';
import { prefixo } from 'src/app/registros/models/url';

@Component({
  selector: 'app-tabela-extras',
  templateUrl: './tabela-extras.component.html',
  styleUrls: ['./tabela-extras.component.css']
})
export class TabelaExtrasComponent implements OnInit {

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
      this.displayedColumns = ['documento', 'nome', 'horaini', 'horafim'];
    } else {
      this.displayedColumns  = ['documento', 'nome', 'horaini', 'diaini', 'horafim', 'diafim'];
    }
    this.buscarExtras();
  }

  buscarExtras() {
    this.adm.buscarExtras(prefixo).subscribe(res => {
      this.json = res;
      if (typeof(this.json) === 'string') {
        this.snackBar.open(this.json, 'Ok', {
          duration: 10000
        });
      } else {
        this.json.map(item => item.dataini = (new Date(item.dataini).toLocaleDateString('pt-BR')));
        this.json.map(item => item.datafim = (new Date(item.datafim).toLocaleDateString('pt-BR')));
        this.dataSource = new MatTableDataSource(this.json);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  buscarExtraParams() {
    let endpoint;
    if (this.usuario) {
      if (this.inicio) {
        endpoint = 'extras/allbydocdate'
      } else {
        endpoint = 'extras/allbydoc';
      }
    } else {
      this.buscarExtras();
      return true;
    }
    this.adm.buscarPorUsuario(prefixo, endpoint, this.usuario, this.inicio, this.fim, this.periodo).subscribe(res => {
      this.json = res;
      console.log(res);
      if (typeof(this.json) === 'string') {
        this.snackBar.open(this.json, 'Ok', {
          duration: 10000
        });
      } else {
        this.json.map(item => item.dataini = (new Date(item.dataini).toLocaleDateString('pt-BR')));
        this.json.map(item => item.datafim = (new Date(item.datafim).toLocaleDateString('pt-BR')));
        this.dataSource = new MatTableDataSource(this.json);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

}
