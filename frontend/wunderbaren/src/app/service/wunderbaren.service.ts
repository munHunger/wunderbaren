import {Injectable} from "@angular/core";
import {Http, Headers, Response, URLSearchParams} from "@angular/http";
import {Observable} from "rxjs";
import { Group } from "app/model/group.model";
import { Item } from "app/model/item.model";
import { CookieService } from "angular2-cookie/services/cookies.service";

@Injectable()
export class WunderbarService
{
    public order: Item[] = [];
    private baseURL: string = "http://localhost:8080/api";
    private headers: any;

    constructor(private http: Http, private cookieService: CookieService)
    {
        console.log("constructing services");
        if(cookieService.get("order") !== undefined)
            this.order = JSON.parse(cookieService.get("order"));
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.headers.append('Access-Control-Allow-Headers', '*');
    }

    public getStock(): Observable<Group[]>
    {
        return this.http.get(this.baseURL + "/stock").map(res => res.json()).catch(this.handleError);
    }

    handleError(error:Response | any)
    {
        let errMsg:string;
        errMsg = `${error.status} - ${error.statusText || ''}`;
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}