import {Injectable} from "@angular/core";
import {Http, Headers, Response, URLSearchParams} from "@angular/http";
import {Observable} from "rxjs";
import {Item} from "./item.model";
import {CookieService} from "angular2-cookie/core";

@Injectable()
export class WunderbarService
{
  private baseURL: string = "/api/wunderbaren";
  private headers: any;

  constructor(private http: Http, private cookieService:CookieService)
  {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.headers.append('Access-Control-Allow-Headers', '*');
  }

  public getCategory(category: string): Observable<any>
  {
    return this.http.get(this.baseURL + "?category=" + category, {
      headers : this.headers
    }).catch(this.handleError);
  }

  public getCategoryUpdate(category: string, hash: string): Observable<any>
  {
    var headers = new Headers();
    headers.append('Access-Control-Allow-Headers', '*');
    headers.append('hash', hash);
    return this.http.get(this.baseURL + "/update?category=" + category, {
      headers : headers
    }).catch(this.handleError);
  }

  public decrease(name: string)
  {
    const body = new URLSearchParams();
    body.set("name", name);

    return this.http.put(this.baseURL + "/decrease", body.toString(), {
      headers : this.headers
    }).subscribe();
  }

  public increase(name: string)
  {
    const body = new URLSearchParams();
    body.set("name", name);

    return this.http.put(this.baseURL + "/increase", body.toString(), {
      headers : this.headers
    }).subscribe();
  }

  handleError(error:Response | any)
  {
    let errMsg:string;
    errMsg = `${error.status} - ${error.statusText || ''}`;
    if (error.status == 401)
    {
      this.cookieService.remove("token");
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
