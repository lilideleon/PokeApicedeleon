import { Component, NgModule, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';


@Component({
  selector: 'app-poke-detail',
  templateUrl: './poke-detail.component.html',
  styleUrl: './poke-detail.component.css'
})

export class PokeDetailComponent implements OnInit {

  pokemon: any = '';
  pokemonType = [];
  pokemonImg = '';


  constructor(private pokemonService: PokemonService, private activatedRouter: ActivatedRoute){
    this.activatedRouter.params.subscribe(
      params=> {
        this.getPokemon(params['id']);
      }
    );
  }

  ngOnInit(): void {
    
  }

  getPokemon(id:number)
  {
    this.pokemonService.getPokemons(id).subscribe(
      res=>{
        console.log(res);
        this.pokemon = res;
        this.pokemonImg = this.pokemon.sprites.front_default;
        this.pokemonType = res.Types[0].type.name;
      },
      err => {
          console.log("ERROR AL CONSUMIR SERVICIO " + err);
      }
    );
  }
}

