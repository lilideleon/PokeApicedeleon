import { Component, ViewChild } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-poke-table',
  templateUrl: './poke-table.component.html',
  styleUrl: './poke-table.component.css'
})
export class PokeTableComponent {

  displayedColumns: string[] = ['position','image','name'];

  data:any[] = [];
  datasourse = new MatTableDataSource<any>(this.data);
  pokemons = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = {} as MatPaginator;

  constructor (private pokeService:PokemonService){}

  ngOnInit():void{
    this.getPokemons();
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
}
