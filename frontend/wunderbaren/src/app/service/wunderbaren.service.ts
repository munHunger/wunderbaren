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
    private baseURL: string = "http://localhost:8085/wunderbaren/api";
    public headers: any;

    constructor(private http: Http, private cookieService: CookieService)
    {
        console.log("constructing services");
        if(cookieService.get("order") !== undefined)
            this.order = JSON.parse(cookieService.get("order"));
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.headers.append('Access-Control-Allow-Headers', '*');
        this.headers.append('Access-Control-Allow-Origin', '*');
        if(cookieService.get("access_token") != undefined)
            this.headers.append('access_token', this.cleanToken(cookieService.get("access_token")));
    }

    private cleanToken(token): string {
        return token.replace(/,/g, "").replace(/ /g, "");
    }

    public login(accessToken): void {
        this.headers.append('access_token', this.cleanToken(accessToken));
    }

    public getStock(): Observable<Group[]>
    {
        return this.http.get(this.baseURL + "/stock", { headers: this.headers }).map(res => res.json()).catch(this.handleError);
    }

    public initLogin(pin: string): Observable<any>
    {
        return this.http.post(this.baseURL + "/auth/initiate?pin=" + pin, null, { headers: this.headers });
    }

    public initiatePayment(): Observable<any>
    {
        let body = new URLSearchParams();
        for(let item of this.order)
            body.set('barcodes', item.barcode);
        return this.http.post(this.baseURL + "/purchase/initiatePayment", body, { headers: this.headers });
    }

    handleError(error:Response | any)
    {
        let errMsg:string;
        errMsg = `${error.status} - ${error.statusText || ''}`;
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}