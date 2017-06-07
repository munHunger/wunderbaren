import {Injectable} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {CookieService} from "angular2-cookie/core";

@Injectable()
export class UserService
{
  public isLoggedIn: boolean = false;
  public requestLogin: boolean = false;
  public code: string;

  private baseURL: string = "/api/oauth";
  private headers: any;

  public userData: any;

  constructor(private http: Http, private cookieService:CookieService)
  {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.headers.append('Access-Control-Allow-Headers', '*');
  }

  public setCode(code: string)
  {
    this.code = code;
    this.headers.append("Authorization", "Bearer " + this.code);
    this.http.get(this.baseURL + "/user", {
      headers : this.headers
    }).map(res => res.json()).catch(this.handleError).subscribe(res => {this.userData = res});
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
