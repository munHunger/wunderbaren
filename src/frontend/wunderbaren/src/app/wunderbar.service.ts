import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
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

  public getCategory(category: string): Observable<any>
  {
    return this.http.get(this.baseURL + "?category=" + category).map(body => body.json()).catch(this.handleError);
  }
  private handleError(error: Response | any)
  {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response)
    {
      const body = error.json() || '';
      const err = JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    }
    else
    {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
