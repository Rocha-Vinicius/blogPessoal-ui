import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  tema: Tema = new Tema()
  listaTemas: Tema[]

  constructor(
    private router: Router,
    private temaservice: TemaService
  ) { }

  ngOnInit() {
    if (environment.token == "") {

      this.router.navigate(["/entrar"])
    }

    this.finfAllTemas()
  }

  finfAllTemas(){
    this.temaservice.getAllTema().subscribe((resp: Tema[])=> {
      this.listaTemas = resp
    })
  }

  cadastrar() {
    this.temaservice.postTema(this.tema).subscribe((resp: Tema) => {
      this.tema = resp
      alert('Tema cadastrado com sucesso!')
      this.finfAllTemas()
      this.tema = new Tema()
    })
  }

}
