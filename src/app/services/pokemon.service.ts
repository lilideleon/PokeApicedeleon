import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getPokemonsList (){
    return this.http.get<any>(`${this.baseUrl}/pokemon`); // utilizamos alt 96 para este simbolo ``
  }

  getPokemons (index: Number){
    return this.http.get<any>(`${this.baseUrl}/pokemon/${index}`); // utilizamos alt 96 para este simbolo ``
  }
}
