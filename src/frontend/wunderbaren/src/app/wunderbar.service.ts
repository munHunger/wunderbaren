import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {Observable} from "rxjs";
import {Item} from "./item.model";

@Injectable()
export class WunderbarService
{
  private baseURL: string = "https://wunderbaren.se/api/wunderbaren";
  private headers: any;

  constructor(private http: Http)
  {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Headers', '*');
  }

  public getCategory(category: string): Observable<Item[]>
  {
    return this.http.get(this.baseURL + "?category=" + category).map(res => res.json());
  }
}
