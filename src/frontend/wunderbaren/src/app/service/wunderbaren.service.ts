import {Injectable} from "@angular/core";
import {Http, Headers, Response, URLSearchParams} from "@angular/http";
import {Observable} from "rxjs";
import { Group } from "app/model/group.model";

@Injectable()
export class WunderbarService
{
    private baseURL: string = "http://localhost:8080/api";
    private headers: any;

    constructor(private http: Http)
    {
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