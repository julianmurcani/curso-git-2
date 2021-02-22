import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = "ewDQGbbITZNV4bh7JpF5Naj1OvtvkTqO";
  private _historial: string[] = [];

  public resultados: any[] = [];
  get historial() {
    return [...this._historial];
  }

  constructor( private http: HttpClient ){}
 
  buscarGifs( query: string){
    query = query.trim().toLocaleLowerCase();
    if( !this._historial.slice(1,10).includes( query ) ){
          this._historial.unshift( query );
    }
    console.log(this._historial);

    this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=ewDQGbbITZNV4bh7JpF5Naj1OvtvkTqO&q=${query}&limit=10`)
      .subscribe( (resp: any) => {
        console.log(resp.data);
        this.resultados = resp.data;
      })
  }


}
