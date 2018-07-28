import {Injectable} from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";
import { CookieService } from "angular2-cookie/services/cookies.service";
import { Item } from "../model/item.model";

@Injectable()
export class WunderbarService
{
    public order: Item[] = [];
    private baseURL: string = "http://localhost:8085/wunderbaren-3.0/api";
    public headers: any;

    constructor(private http: HttpClient, private cookieService: CookieService)
    {
        console.log("constructing services");
        if(cookieService.get("order") !== undefined)
            this.order = JSON.parse(cookieService.get("order"));
        this.updateHeaders();
    }

    public updateHeaders() {
        this.headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'access_token': (this.cookieService.get("access_token") != undefined ? this.cleanToken(this.cookieService.get("access_token")) : "")
        });
    }

    public addSwish(rfid: string, amount:number) {
        let body = "id=" + encodeURI(rfid);
        this.http.post(this.baseURL + "/user", body, { headers: this.headers }).subscribe(res => {
            let body = "amount=" + amount;
            this.http.put(this.baseURL + "/user/" + rfid, body, { headers: this.headers }).subscribe(res => {
                
            }); 
        });
    }

    private cleanToken(token): string {
        return token.replace(/,/g, "").replace(/ /g, "");
    }

    public getStock(): Observable<any>
    {
        return this.http.get(this.baseURL + "/stock", { headers: this.headers });
    }

    public initLogin(pin: string): Observable<any>
    {
        return this.http.post(this.baseURL + "/auth/initiate?pin=" + pin, null, { headers: this.headers, observe: 'response' });
    }

    public completeLogin(pin: string, rfid: string) {
        let body = "id=" + encodeURI(rfid);
        this.http.post(this.baseURL + "/user", body, { headers: this.headers }).subscribe(res => {
            this.http.post(this.baseURL + "/auth/complete?pin=" + pin + "&rfid=" + rfid, null, { headers: this.headers }).subscribe(res =>{});
        });
    }

    public getUser(rfid: string): Observable<any> {
        return this.http.get(this.baseURL + "/user/" + rfid, { headers: this.headers });
    }

    public initiatePayment(): Observable<any>
    {
        var items = "";
        for(let item of this.order)
            items += item.barcode + ",";
        items = items.substr(0, items.length - 1);
        let body = "barcodes=" + encodeURI(items);
        return this.http.post(this.baseURL + "/purchase/initiatePayment", body, { headers: this.headers });
    }

    public completePayment(rfid: string) {
        let body = "user=" + rfid;
        return this.http.post(this.baseURL + "/purchase/completePayment", body, { headers: this.headers }).subscribe(res => {});
    }

    public completePaymentSwish() {
        return this.http.post(this.baseURL + "/purchase/completePayment/swish", null, { headers: this.headers }).subscribe(res => {});
    }

    handleError(error:Response | any)
    {
        let errMsg:string;
        errMsg = `${error.status} - ${error.statusText || ''}`;
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}