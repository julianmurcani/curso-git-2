import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { GifSearchResponse, Gif } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = "ewDQGbbITZNV4bh7JpF5Naj1OvtvkTqO";
  private _historial: string[] = [];

  public resultados: Gif[] = [];
  get historial() {
    return [...this._historial];
  }

  constructor( private http: HttpClient ){
    this._historial = JSON.parse(localStorage.getItem('historial')!);
    this.resultados = JSON.parse(sessionStorage.getItem('resultados')!);
  }
 
  buscarGifs( query: string){
    query = query.trim().toLocaleLowerCase();
    if( !this._historial.slice(1,10).includes( query ) ){
          this._historial.unshift( query );
          localStorage.setItem('historial',JSON.stringify(this.historial));
    }
    console.log(this._historial);

    this.http.get<GifSearchResponse>(`https://api.giphy.com/v1/gifs/search?api_key=ewDQGbbITZNV4bh7JpF5Naj1OvtvkTqO&q=${query}&limit=10`)
      .subscribe( (resp) => {
        console.log(resp.data);
        this.resultados = resp.data;
        sessionStorage.setItem('resultados',JSON.stringify(this.resultados));
      })
  }


}
