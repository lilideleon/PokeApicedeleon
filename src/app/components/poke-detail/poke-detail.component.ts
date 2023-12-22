import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-poke-detail',
  templateUrl: './poke-detail.component.html',
  styleUrl: './poke-detail.component.css'
})
export class PokeDetailComponent implements OnInit {

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
      },
      err => {
        
      }
    );
  }
}
