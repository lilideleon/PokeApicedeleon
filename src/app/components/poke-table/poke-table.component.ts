import { Component, ViewChild } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-poke-table',
  templateUrl: './poke-table.component.html',
  styleUrl: './poke-table.component.scss'
})
export class PokeTableComponent {

  displayedColumns: string[] = ['position','image','name'];

  data:any[] = [];
  datasourse = new MatTableDataSource<any>(this.data);
  pokemons = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = {} as MatPaginator;

  constructor (
      private pokeService:PokemonService,
      private router:Router,
      private activatedRoute: ActivatedRoute,
      private viewportScroller: ViewportScroller
   ){}

  ngOnInit():void{
    this.getPokemons();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Desplázate a la parte superior de la página después de la navegación.
      this.viewportScroller.scrollToPosition([0, 0]);
    });
  }

  getPokemons ()
  {
    let pokemonData;
    for (let i=1; i<= 150; i++)
    {
      this.pokeService.getPokemons(i).subscribe(
        res =>{
          console.log(res);
          pokemonData = {
            position: i,
            image: res.sprites.front_default,
            name:res.name
          };
          this.data.push(pokemonData);
          this.datasourse = new MatTableDataSource<any>(this.data);
          this.datasourse.paginator = this.paginator;
        },
        err=>{
          console.log("error al consumir el servicio " + err);
        }
      );
    }
  }

    ///metodo de angular material componente : table

    applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasourse.filter = filterValue.trim().toLowerCase();

    if (this.datasourse.paginator) {
      this.datasourse.paginator.firstPage();
    }
  }

  getRow(row: any)
  {
    console.log(row);
    this.router.navigateByUrl(`pokeDetail/${row.position}`);
  }
}
